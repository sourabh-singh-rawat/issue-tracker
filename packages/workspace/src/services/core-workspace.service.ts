import {
  TypeormStore,
  JwtToken,
  ServiceResponse,
  TransactionExecutionError,
  UserAlreadyExists,
  UserNotFoundError,
  WorkspaceInvitePayload,
  WorkspaceMemberStatus,
  WorkspacePermissions,
  WorkspaceRegistrationData,
  WorkspaceRoles,
} from "@sourabhrawatcc/core-utils";
import { v4 } from "uuid";
import { WorkspaceService } from "./interfaces/workspace.service";
import { WorkspaceCreatedPublisher } from "../messages/publishers/workspace-created.publisher";
import { WorkspaceGuardian } from "../app/guardians/casbin/workspace.guardian";
import { UserRepository } from "../repositories/interface/user-repository";
import { WorkspaceRepository } from "../repositories/interface/workspace-repository";
import { WorkspaceMemberRepository } from "../repositories/interface/workspace-member";
import { WorkspaceMemberInviteRepository } from "../repositories/interface/workspace-member-invite.repository";
import { WorkspaceInviteCreatedPublisher } from "../messages/publishers/workspace-invite-created.publisher";
import { UserEntity, WorkspaceEntity } from "../app/entities";
import { WorkspaceMemberEntity } from "../app/entities/workspace-member.entity";
import { WorkspaceMemberInviteEntity } from "../app/entities/workspace-member-invite.entity";

export class CoreWorkspaceService implements WorkspaceService {
  constructor(
    private store: TypeormStore,
    private workspaceGuardian: WorkspaceGuardian,
    private userRepository: UserRepository,
    private workspaceRepository: WorkspaceRepository,
    private workspaceMemberRepository: WorkspaceMemberRepository,
    private workspaceCreatedPublisher: WorkspaceCreatedPublisher,
    private workspaceMemberInviteRepository: WorkspaceMemberInviteRepository,
    private workspaceInviteCreatedPublisher: WorkspaceInviteCreatedPublisher,
  ) {}

  private saveWorkspace = async (
    workspace: WorkspaceEntity,
    workspaceMember: WorkspaceMemberEntity,
    user?: UserEntity,
  ) => {
    const queryRunner = this.store.createQueryRunner();
    const result = await this.store.transaction(
      queryRunner,
      async (queryRunner) => {
        if (user) {
          await this.userRepository.save(user, { queryRunner });
        }

        const savedWorkspace = await this.workspaceRepository.save(workspace, {
          queryRunner,
        });
        const savedWorkspaceMember = await this.workspaceMemberRepository.save(
          workspaceMember,
          { queryRunner },
        );
        await this.workspaceGuardian.createWorkspacePolicies(
          workspace.ownerUserId,
          workspace.id,
        );

        return { savedWorkspace, savedWorkspaceMember };
      },
    );

    if (!result) {
      throw new TransactionExecutionError(
        "Failed to save workspace, member, and policies",
      );
    }

    const { savedWorkspace, savedWorkspaceMember } = result;
    await this.workspaceCreatedPublisher.publish({
      id: savedWorkspace.id,
      name: savedWorkspace.name,
      ownerId: savedWorkspace.ownerUserId,
      member: {
        userId: savedWorkspaceMember.userId,
        workspaceId: savedWorkspaceMember.workspaceId,
      },
    });

    return savedWorkspace;
  };

  createDefaultWorkspace = async (user: UserEntity) => {
    const { defaultWorkspaceId, id } = user;

    const newWorkspace = new WorkspaceEntity();
    newWorkspace.id = defaultWorkspaceId;
    newWorkspace.name = "Default Workspace";
    newWorkspace.ownerUserId = id;

    const newWorkspaceMember = new WorkspaceMemberEntity();
    newWorkspaceMember.userId = id;
    newWorkspaceMember.workspaceId = defaultWorkspaceId;

    const savedWorkspace = await this.saveWorkspace(
      newWorkspace,
      newWorkspaceMember,
      user,
    );
  };

  createWorkspace = async (
    userId: string,
    workspace: WorkspaceRegistrationData,
  ) => {
    const { name, description } = workspace;
    const workspaceId = v4();

    const newWorkspace = new WorkspaceEntity();
    newWorkspace.id = workspaceId;
    newWorkspace.name = name;
    newWorkspace.description = description;
    newWorkspace.ownerUserId = userId;

    const newWorkspaceMember = new WorkspaceMemberEntity();
    newWorkspaceMember.userId = userId;
    newWorkspaceMember.workspaceId = workspaceId;

    const savedWorkspace = await this.saveWorkspace(
      newWorkspace,
      newWorkspaceMember,
    );

    return new ServiceResponse({ rows: savedWorkspace.id });
  };

  /**
   * Should create a workspace member if they do not exists
   * @param userId
   * @param workspaceId
   * @param role
   * @returns
   */
  createWorkspaceMember = async (
    userId: string,
    workspaceId: string,
    role: WorkspaceRoles,
  ) => {
    const isMember = await this.workspaceMemberRepository.existsByUserId(
      userId,
      workspaceId,
    );

    if (isMember) throw new UserAlreadyExists();

    const newWorkspaceMember = new WorkspaceMemberEntity();
    newWorkspaceMember.userId = userId;
    newWorkspaceMember.workspaceId = workspaceId;

    await this.workspaceMemberRepository.save(newWorkspaceMember);

    if (role === WorkspaceRoles.Member) {
      await this.workspaceGuardian.createWorkspaceMember(userId, workspaceId);
    }

    if (role === WorkspaceRoles.Admin) {
      await this.workspaceGuardian.createWorkspaceAdmin(userId, workspaceId);
    }
  };

  createWorkspaceInvite = async (
    userId: string,
    email: string,
    role: WorkspaceRoles,
  ) => {
    const sender = await this.userRepository.findById(userId);
    if (!sender) throw new UserNotFoundError();
    const { defaultWorkspaceId } = sender;

    this.workspaceGuardian.validatePermission(
      userId,
      defaultWorkspaceId,
      WorkspacePermissions.Invite,
    );

    const isReceiverMember =
      await this.workspaceMemberRepository.existsById(email);
    if (isReceiverMember) throw new UserAlreadyExists();

    const newWorkspaceMemberInvite = new WorkspaceMemberInviteEntity();
    newWorkspaceMemberInvite.senderId = userId;
    newWorkspaceMemberInvite.receiverEmail = email;
    newWorkspaceMemberInvite.workspaceId = defaultWorkspaceId;
    newWorkspaceMemberInvite.status = WorkspaceMemberStatus.PENDING;

    const { id, status } = await this.workspaceMemberInviteRepository.save(
      newWorkspaceMemberInvite,
    );

    await this.workspaceInviteCreatedPublisher.publish({
      senderId: userId,
      senderEmail: sender.email,
      senderName: sender.displayName,
      receiverEmail: email,
      receiverStatus: status,
      receiverRole: role,
      workspaceId: defaultWorkspaceId,
    });
  };

  /**
   * Should confirm workspace invites,
   * if confirmed and user is already logged in then add the user as member
   *
   * redirect the user to signup page with token
   */
  confirmWorkspaceInvite = async (token: string) => {
    let verifedToken: WorkspaceInvitePayload;
    try {
      verifedToken = JwtToken.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error("Token verification failed");
    }

    // Token verified, check if the user is a account holder
    const { receiverEmail } = verifedToken;
    const userExists = await this.userRepository.findByEmail(receiverEmail);

    if (!userExists) {
      return new ServiceResponse({
        rows: `https://localhost:3000/signup?inviteToken=${token}`,
      });
    }

    return new ServiceResponse({
      rows: `http://localhost:3000/login?inviteToken=${token}`,
    });
  };

  getAllWorkspaces = async (userId: string) => {
    const workspaces = await this.workspaceRepository.find(userId);

    return new ServiceResponse({
      rows: workspaces,
      filteredRowCount: workspaces.length,
    });
  };

  getWorkspace = async (id: string) => {
    const doesWorkspaceExists = await this.workspaceRepository.existsById(id);
    if (!doesWorkspaceExists) {
      throw Error("Workspace does not exist");
    }

    const workspace = await this.workspaceRepository.findById(id);

    return new ServiceResponse({ rows: workspace });
  };

  getWorkspaceRoleList = async () => {
    return new ServiceResponse({ rows: Object.values(WorkspaceRoles) });
  };

  getWorkspaceMemberList = async (workspaceId: string) => {
    const rows = await this.workspaceMemberRepository.find(workspaceId);

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };
}
