import { v4 } from "uuid";
import axios from "axios";
import {
  AuthCredentials,
  EmailNotVerifiedError,
  InvalidCredentialsError,
  ServiceResponse,
  Token,
  Tokens,
  UnauthorizedError,
  UserDetails,
  UserNotFoundError,
} from "@sourabhrawatcc/core-utils";

import { Services } from "../app/container.config";
import { IdentityService } from "./interfaces/identity-service";
import { AccessTokenEntity, RefreshTokenEntity } from "../data/entities";
import { StatusCodes } from "http-status-codes";
import { TokenOptions } from "./interfaces/token-options";

export class CoreIdentityService implements IdentityService {
  private readonly _context;
  private readonly _userRepository;
  private readonly _accessTokenRepository;
  private readonly _refreshTokenRepository;

  constructor(container: Services) {
    this._context = container.postgresContext;
    this._userRepository = container.userRepository;
    this._accessTokenRepository = container.accessTokenRepository;
    this._refreshTokenRepository = container.refreshTokenRepository;
  }

  /**
   * Return Boolean indicating whether the user exists.
   * @param email
   * @returns
   */
  private isUserExistsByEmail = async (email: string) => {
    return await this._userRepository.existsByEmail(email);
  };

  /**
   * Returns user, if user exists else returns null.
   * @param email
   * @returns
   */
  private getUserByEmail = async (email: string) => {
    return await this._userRepository.findByEmail(email);
  };

  private getUserById = async (id: string) => {
    return await this._userRepository.findById(id);
  };

  /**
   * Returns number of seconds past unix epoch + x min.
   * @param min
   * @returns
   */
  private generateTime = (min: number) => {
    return Math.floor(Date.now() / 1000) + min * 60;
  };

  private generateId = () => {
    return v4();
  };

  /**
   * Creates accessToken
   * @param userDetails
   * @param exp expiration time in ms
   * @returns access token string
   */
  private createAccessToken = (
    userDetails: UserDetails,
    options: TokenOptions,
  ) => {
    const { exp, jwtid } = options;

    const payload = {
      ...userDetails,
      userMetadata: { language: "en" },
      appMetadata: { roles: ["user"] },
      iss: "identity-service",
      aud: "client",
      sub: userDetails.id,
      exp,
      jwtid,
    };

    const secret = process.env.JWT_SECRET!;

    const newAccessToken = new AccessTokenEntity();
    newAccessToken.id = jwtid;
    newAccessToken.userId = userDetails.id;
    newAccessToken.tokenValue = Token.create(payload, secret);
    newAccessToken.expirationAt = new Date(exp * 1000);

    return newAccessToken;
  };

  /**
   * Create refreshToken
   * @param userDetails
   * @param exp expiration time in ms
   * @returns refresh token string
   */
  private createRefreshToken = (userId: string, options: TokenOptions) => {
    const { exp, jwtid } = options;
    const payload = {
      userId,
      iss: "identity-service",
      aud: "client",
      sub: userId,
      exp,
      jwtid,
    };

    const secret = process.env.JWT_SECRET!;

    const newRefreshToken = new RefreshTokenEntity();
    newRefreshToken.id = jwtid;
    newRefreshToken.userId = userId;
    newRefreshToken.tokenValue = Token.create(payload, secret);
    newRefreshToken.expirationAt = new Date(exp * 1000);

    return newRefreshToken;
  };

  /**
   * Generates access and refresh tokens
   * @returns tokens
   */
  private generateTokens = (user: UserDetails) => {
    const access = this.createAccessToken(user, {
      exp: this.generateTime(15),
      jwtid: this.generateId(),
    });
    // create refresh token
    const refresh = this.createRefreshToken(user.id, {
      exp: this.generateTime(60 * 24),
      jwtid: this.generateId(),
    });

    return { access, refresh };
  };

  private saveTokens = async (
    accessToken: AccessTokenEntity,
    refreshToken: RefreshTokenEntity,
  ) => {
    await this._context.transaction((queryRunner) => {
      this._accessTokenRepository.save(accessToken, { queryRunner });
      this._refreshTokenRepository.save(refreshToken, { queryRunner });
    });
  };

  /**
   * Authenticates the current user with provided credentials
   * @param user
   */
  authenticate = async (
    credentials: AuthCredentials,
  ): Promise<ServiceResponse<Tokens>> => {
    const { email, password } = credentials;

    const user = await this.getUserByEmail(email);
    if (!user) throw new UserNotFoundError();
    if (!user.isEmailVerified) throw new EmailNotVerifiedError();

    const response = await axios.post(
      "http://user-service:4000/api/v1/users/verify-password",
      { email, password },
    );

    if (response.status !== StatusCodes.OK) throw new InvalidCredentialsError();

    const userDetails = new UserDetails({
      id: user.id,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    });

    const { access, refresh } = this.generateTokens(userDetails);

    await this.saveTokens(access, refresh);

    return new ServiceResponse({
      data: {
        accessToken: access.tokenValue,
        refreshToken: refresh.tokenValue,
      },
    });
  };

  // TODO: revokeToken methods
  // removes both access and refresh tokens from the database

  /**
   * Generate new access tokens and refresh tokens
   * @param token
   * @returns
   */
  refreshToken = async (token: Tokens): Promise<ServiceResponse<Tokens>> => {
    const { refreshToken } = token;
    const secret = process.env.JWT_SECRET;

    const { userId, jwtid } = Token.verify(refreshToken, secret!);

    const isTokenPresent = await this._refreshTokenRepository.existsById(jwtid);
    if (!isTokenPresent) throw new UnauthorizedError();

    const user = await this.getUserById(userId);
    if (!user) throw new UserNotFoundError();

    const userDetails = new UserDetails({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      isEmailVerified: user.isEmailVerified,
    });

    const { access, refresh } = this.generateTokens(userDetails);

    await this.saveTokens(access, refresh);

    return new ServiceResponse({
      data: {
        accessToken: access.tokenValue,
        refreshToken: refresh.tokenValue,
      },
    });
  };
}
