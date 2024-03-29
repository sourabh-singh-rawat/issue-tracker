import { FastifyReply, FastifyRequest } from "fastify";
import { ProjectController } from "./interfaces/project.controller";
import {
  Filters,
  ProjectFormData,
  ProjectRoles,
} from "@sourabhrawatcc/core-utils";
import { ProjectService } from "../services/interfaces/project.service";
import { StatusCodes } from "http-status-codes";

export class CoreProjectController implements ProjectController {
  constructor(private projectService: ProjectService) {}

  createProject = async (
    request: FastifyRequest<{ Body: ProjectFormData }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const project = request.body;

    const response = await this.projectService.createProject(userId, project);

    return reply.status(StatusCodes.CREATED).send(response);
  };

  createProjectInvite = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: { userId: string; role: ProjectRoles; workspaceId: string };
    }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const { userId, role, workspaceId } = request.body;
    const { userId: invitedBy } = request.currentUser;

    await this.projectService.createProjectInvite(
      userId,
      id,
      role,
      invitedBy,
      workspaceId,
    );

    return reply.send();
  };

  confirmProjectInvite = async (
    request: FastifyRequest<{ Querystring: { inviteToken: string } }>,
    reply: FastifyReply,
  ) => {
    const { inviteToken } = request.query;

    const response =
      await this.projectService.confirmProjectInvite(inviteToken);

    return reply.send(response);
  };

  getProjectStatusList = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    return reply.send(this.projectService.getProjectStatusList());
  };

  getProjectList = async (
    request: FastifyRequest<{ Querystring: Filters }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const filters = request.query;

    const response = await this.projectService.getProjectList(userId, filters);

    return reply.send(response);
  };

  getProject = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const response = await this.projectService.getProject(id);

    return reply.send(response);
  };

  getProjectMembers = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const response = await this.projectService.getProjectMembers(id);

    return reply.send(response);
  };

  getProjectRoleList = async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send(this.projectService.getProjectRoleList());
  };

  getWorkspaceMemberList = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const { id } = request.params;

    const response = await this.projectService.getWorkspaceMemberList(
      userId,
      id,
    );

    return reply.send(response);
  };

  updateProject = async (
    request: FastifyRequest<{ Params: { id: string }; Body: ProjectFormData }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const updatables = request.body;

    await this.projectService.updateProject(id, updatables);
  };
}
