import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceEntity } from "../entities";
import { WorkspaceRepository } from "./interface/workspace-repository";
import { RegisteredServices } from "../../app/service-container";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  private readonly databaseService;

  constructor(serviceContainer: RegisteredServices) {
    this.databaseService = serviceContainer.databaseService;
  }

  /**
   * Creates a new workspace
   * @param workspace
   * @param options
   * @returns
   */
  save = async (workspace: WorkspaceEntity, options?: QueryBuilderOptions) => {
    const { id, name, description, ownerUserId } = workspace;
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .queryBuilder(WorkspaceEntity, "w", queryRunner)
      .insert()
      .into(WorkspaceEntity)
      .values({ id, name, description, ownerUserId })
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceEntity;
  };

  /**
   * Checks if workspace exists
   * @param id Workspace id
   * @returns boolean indicating if workspace exists
   */
  existsById = async (id: string) => {
    const result = await this.databaseService.query<{
      workspace_exists_by_id: boolean;
    }>("SELECT * FROM workspace_exists_by_id($1)", [id]);

    return result[0].workspace_exists_by_id;
  };

  /**
   * Finds a workspace by id
   * @param id
   */
  findById = async (id: string) => {
    const result = await this.databaseService.query<WorkspaceEntity>(
      "SELECT * FROM find_workspace_by_id($1)",
      [id],
    );

    return result[0];
  };

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
