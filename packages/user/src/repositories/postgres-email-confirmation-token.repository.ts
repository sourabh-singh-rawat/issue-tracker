import { QueryBuilderOptions, TypeormStore } from "@sourabhrawatcc/core-utils";
import { VerificationEmailRepository } from "./interfaces/verification-email.repository";
import { VerificaionEmailEntity } from "../app/entities/verification-email.entity";

export class PostgresVerificationEmailRepository
  implements VerificationEmailRepository
{
  constructor(private readonly store: TypeormStore) {}

  save = async (
    email: VerificaionEmailEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.store
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(VerificaionEmailEntity)
      .values(email)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as VerificaionEmailEntity;
  };

  existsById = async (id: string) => {
    return await VerificaionEmailEntity.exists({ where: { id } });
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
