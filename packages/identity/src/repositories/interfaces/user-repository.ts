import { QueryBuilderOptions, Repository } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../../app/entities/user.entity";

export interface UserRepository extends Repository<UserEntity> {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  existsByEmail(email: string): Promise<boolean>;
  // isOldPasswordMatch(id: string, password: string): Promise<boolean>;
  // update(id: string, user: UserUpdateDto): Promise<UserEntity>;
  updateEmail(id: string, email: string): Promise<boolean>;
  updateUser(
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>; // updateEmailVerificationStatus(id: string, status: string): Promise<void>;
  // updatePassword(
  //   id: string,
  //   password: string,
  //   opts?: RepositoryOptions,
  // ): Promise<boolean>;
}
