import {
  IssueActivity,
  IssueCreatedPayload,
  ProjectActivity,
  ProjectPayload,
  ServiceResponse,
} from "@sourabhrawatcc/core-utils";
import { ProjectActivityService } from "./interfaces/project-activity.service";
import { IssueActivityEntity, ProjectActivityEntity } from "../app/entities";
import { ProjectActivityRepository } from "../repositories/interfaces/project-activity.repository";

export class CoreProjectActivityService implements ProjectActivityService {
  constructor(
    private readonly projectActivityRepository: ProjectActivityRepository,
  ) {}

  logCreatedIssue = async (payload: IssueCreatedPayload) => {
    const { id, name, description, projectId, createdAt, reporterId } = payload;

    const newIssueActivity = new IssueActivityEntity();
    newIssueActivity.issueId = id;
    newIssueActivity.type = IssueActivity.CREATED_ISSUE;
    newIssueActivity.projectId = projectId;
  };

  logCreatedProject = async (payload: ProjectPayload) => {
    const { id, ownerUserId, createdAt } = payload;

    const newProjectActivity = new ProjectActivityEntity();
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.projectId = id;
    newProjectActivity.action = ProjectActivity.CREATED;
    newProjectActivity.timestamp = createdAt;

    await this.projectActivityRepository.save(newProjectActivity);
  };

  logUpdatedProjectName = async (payload: ProjectPayload) => {
    const { id, ownerUserId, updatedAt } = payload;

    if (!updatedAt) {
      throw new Error("Cannot update project description without timestamp");
    }

    const newProjectActivity = new ProjectActivityEntity();
    newProjectActivity.action = ProjectActivity.UPDATED_NAME;
    newProjectActivity.projectId = id;
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.timestamp = updatedAt;

    await this.projectActivityRepository.save(newProjectActivity);
  };

  logUpdatedProjectDescription = async (payload: ProjectPayload) => {
    const { id, ownerUserId, updatedAt } = payload;

    if (!updatedAt) {
      throw new Error("Cannot update project description without timestamp");
    }

    const newProjectActivity = new ProjectActivityEntity();
    newProjectActivity.userId = ownerUserId;
    newProjectActivity.projectId = id;
    newProjectActivity.action = ProjectActivity.UPDATED_DESCRIPTION;
    newProjectActivity.timestamp = updatedAt;

    await this.projectActivityRepository.save(newProjectActivity);
  };

  getProjectActivityList = async (id: string) => {
    const rows =
      await this.projectActivityRepository.findActivityByProjectId(id);

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };
}
