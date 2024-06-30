import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { UserController } from "./interfaces/user.controller";
import { AuthCredentials, UserRegistrationData } from "@issue-tracker/common";
import { UserService } from "../services/interfaces/user.service";

export class CoreUserController implements UserController {
  constructor(private readonly userService: UserService) {}

  registerUser = async (
    request: FastifyRequest<{
      Body: UserRegistrationData;
      Querystring: { inviteToken: string };
    }>,
    reply: FastifyReply,
  ) => {
    const { inviteToken } = request.query;
    const { email, password, displayName } = request.body;

    const userRegistrationData = new UserRegistrationData({
      email,
      password,
      displayName,
    });
    await this.userService.createUser(userRegistrationData, inviteToken);
    reply.clearCookie("accessToken", { path: "/" });
    reply.clearCookie("refreshToken", { path: "/" });

    return reply.status(StatusCodes.CREATED).send();
  };

  verifyPassword = async (
    request: FastifyRequest<{ Body: AuthCredentials }>,
    reply: FastifyReply,
  ) => {
    const { email, password } = request.body;

    const authCredentials = new AuthCredentials({ email, password });
    await this.userService.verifyPassword(authCredentials);

    return reply.send();
  };

  verifyEmail = async (
    request: FastifyRequest<{ Querystring: { inviteToken: string } }>,
    reply: FastifyReply,
  ) => {
    const { inviteToken } = request.query;
    // confirm this invite token
    await this.userService.verifyEmail(inviteToken);

    return reply.send({ confirmation: true });
  };

  getCurrentUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { currentUser } = request;
    const { email } = currentUser;

    const user = await this.userService.getUserInfoByEmail(email);

    return reply.send(user);
  };
}
