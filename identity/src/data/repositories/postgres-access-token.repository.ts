import { AccessTokenDTO } from "../../dtos/tokens/access-token.dto";
import { AccessTokenRepository } from "./interfaces/access-token-repository.interface";
import { AccessTokenEntity } from "../entities";
import { PostgresContext } from "@sourabhrawatcc/core-utils";
import { RepositoryOptions } from "./interfaces/user-repository.interface";

export class PostgresAccessTokenRepository implements AccessTokenRepository {
  private readonly _context;
  constructor({ postgresContext }: { postgresContext: PostgresContext }) {
    this._context = postgresContext;
  }

  save = async (
    entity: AccessTokenDTO,
    { t }: RepositoryOptions,
  ): Promise<void> => {
    const { expirationAt, tokenValue, userId } = entity;

    const query = this._context
      .queryBuilder(AccessTokenEntity, "access_tokens", t)
      .insert()
      .into(AccessTokenEntity)
      .values({ tokenValue, expirationAt, userId });

    await query.execute();
  };
}
