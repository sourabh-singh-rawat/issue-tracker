import { createContainer, asValue, asClass } from "awilix";
import {
  PostgresContext,
  AwilixServiceContainer,
} from "@sourabhrawatcc/core-utils";
import { logger } from "./logger.config";

import { UserController } from "../controllers/interfaces/user.controller";
import { UserService } from "../services/interface/user.service";
import { UserRepository } from "../data/repositories/interfaces/user.repository";

import { dataSource } from "./db.config";
import { CoreUserController } from "../controllers/core-user.controller";
import { CoreUserService } from "../services/core-user.service";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { UserProfileRepository } from "../data/repositories/interfaces/user-profile.repository";
import { PostgresUserProfileRepository } from "../data/repositories/postgres-user-profile.repository";

export interface Services {
  postgresContext: PostgresContext;
  userController: UserController;
  userService: UserService;
  userRepository: UserRepository;
  userProfileRepository: UserProfileRepository;
}

const awilix = createContainer<Services>();
export const container = new AwilixServiceContainer<Services>(awilix, logger);

const { add } = container;

add("postgresContext", asValue(dataSource));
add("userController", asClass(CoreUserController));
add("userService", asClass(CoreUserService));
add("userRepository", asClass(PostgresUserRepository));
add("userProfileRepository", asClass(PostgresUserProfileRepository));