import { Logger } from "pino";
import { DataSource } from "typeorm";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import {
  logger,
  AwilixServiceContainer,
  DatabaseService,
  MessageService,
} from "@sourabhrawatcc/core-utils";
import { databaseService, dbSource } from "./database-service";
import { messageService } from "./message-service";
import { WorkspaceCasbinPolicyManager, policyManager } from "./policy-manager";

// Controllers
import { WorkspaceController } from "../controllers/interfaces/workspace-controller";
import { CoreWorkspaceController } from "../controllers/core-workspace.controller";

// Services
import { UserService } from "../services/interfaces/user.service";
import { WorkspaceService } from "../services/interfaces/workspace.service";
import { CoreUserService } from "../services/core-user.service";
import { CoreWorkspaceService } from "../services/core-workspace.service";

// Repositories
import { UserRepository } from "../data/repositories/interface/user-repository";
import { WorkspaceRepository } from "../data/repositories/interface/workspace-repository";
import { WorkspaceMemberRepository } from "../data/repositories/interface/workspace-member";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { PostgresWorkspaceRepository } from "../data/repositories/postgres-workspace.repository";
import { PostgresWorkspaceMemberRepository } from "../data/repositories/postgres-workspace-member.repository";

// Publishers and Subscribers
import { WorkspaceCreatedPublisher } from "../messages/publishers/workspace-created.publisher";
import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscribers";
import { UserUpdatedSubscriber } from "../messages/subscribers/user-updated.subscribers";
import { WorkspaceInviteCreatedPublisher } from "../messages/publishers/workspace-invite-created.publisher";
import { WorkspaceMemberInviteRepository } from "../data/repositories/interface/workspace-member-invite.repository";
import { PostgresWorkspaceMemberInviteRepository } from "../data/repositories/postgres-workspace-member-invite.repository";

export interface RegisteredServices {
  logger: Logger;
  dbSource: DataSource;
  databaseService: DatabaseService;
  policyManager: WorkspaceCasbinPolicyManager;
  messageService: MessageService;
  workspaceController: WorkspaceController;
  userService: UserService;
  workspaceService: WorkspaceService;
  userRepository: UserRepository;
  workspaceRepository: WorkspaceRepository;
  workspaceMemberRepository: WorkspaceMemberRepository;
  workspaceMemberInviteRepository: WorkspaceMemberInviteRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  workspaceCreatedPublisher: WorkspaceCreatedPublisher;
  workspaceInviteCreatedPublisher: WorkspaceInviteCreatedPublisher;
}

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});
export const serviceContainer = new AwilixServiceContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = serviceContainer;

add("logger", asValue(logger));
add("dbSource", asValue(dbSource));
add("databaseService", asValue(databaseService));
add("messageService", asValue(messageService));
add("policyManager", asValue(policyManager));
add("workspaceController", asClass(CoreWorkspaceController));
add("userService", asClass(CoreUserService));
add("workspaceService", asClass(CoreWorkspaceService));
add("userRepository", asClass(PostgresUserRepository));
add("workspaceRepository", asClass(PostgresWorkspaceRepository));
add("workspaceMemberRepository", asClass(PostgresWorkspaceMemberRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
add("workspaceCreatedPublisher", asClass(WorkspaceCreatedPublisher));
add(
  "workspaceInviteCreatedPublisher",
  asClass(WorkspaceInviteCreatedPublisher),
);
add(
  "workspaceMemberInviteRepository",
  asClass(PostgresWorkspaceMemberInviteRepository),
);
