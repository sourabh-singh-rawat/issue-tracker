---
name: service
description: >
  Feature application services: I*Service, create/getById/list, authz, transactions,
  outbox events. Triggers: IFooService, injectable service, requirePermission, outbox.
---

# Service

Domain / application layer. Canonical: `platform-service` `features/workspaces/services`.

Persistence: `repository`. Transport: `graphql` / `http-route`. Slice wiring: `service-feature`. Events: `events`. Naming: `AGENTS.md`.

## Layout

```text
features/<feature>/
  services/
    IFooService.ts
    FooService.ts
    FooService.test.ts
    index.ts
  errors/
    FooNotFoundError.ts
```

## Interface + naming

Drop the noun already on the type. Domain verbs — not repository `save` / `findById`.

| Method | Meaning |
| ------ | ------- |
| `create` | business create (may authz + validate + tx + outbox) |
| `getById` | one; **throws** not-found |
| `list` / `listMine` | many |
| `update` / `delete` | mutate |

```ts
export interface IWorkspaceService {
  create: (input: CreateWorkspaceInput, identityId: string) => Promise<Workspace>;
  getById: (id: string, identityId: string) => Promise<Workspace>;
  list: (input: ListWorkspacesInput, identityId: string) => Promise<Workspace[]>;
  listMine: (identityId: string) => Promise<WorkspaceNode[]>;
  update: (id: string, input: UpdateWorkspaceInput, identityId: string) => Promise<Workspace>;
  delete: (id: string, identityId: string) => Promise<void>;
}
```

- Callable properties on interfaces, not method syntax
- Type is not the resource → keep the resource: `IAdminService.createIdentity`
- When editing a long-form service (`createIssue`, `getTenantById`), rename **that** service + internal callers. Do not rename GraphQL fields / HTTP `operationId`s as part of that cleanup

## Responsibilities

**Do in the service**

- Authz (`requirePermission` / `@pine/authorization`)
- Validation and conflict checks (slug/name exists → feature `*ConflictError`)
- `db.transaction` when multiple writes or outbox must be atomic
- Map rows → event DTOs; `createCloudEvent` + `outboxService.schedule(..., { tx })`
- Throw feature `ApplicationError` subclasses (`FooNotFoundError`, expose `true` when client-safe)

**Do not**

- Leak `save` / `findById` as the public API
- Put GraphQL / HTTP parsing here
- Publish raw DB rows as event payloads (`events`)

```ts
@injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    @inject(TYPES.WorkspaceRepository)
    private readonly workspaceRepository: IWorkspaceRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async getById(id: string, identityId: string): Promise<Workspace> {
    await requirePermission(this.authorizationClient, identityId, "read", `workspace:${id}`);
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace) {
      throw new WorkspaceNotFoundError(`Workspace not found: ${id}`);
    }
    return workspace;
  }
}
```

Public members first (constructor + public methods above private helpers). Class methods are normal methods, not arrow properties.

## Errors

```ts
export class WorkspaceNotFoundError extends ApplicationError {
  constructor(message = "Workspace not found") {
    super("WORKSPACE_NOT_FOUND", message, true);
  }
}
```

Keep the noun on error class names (flat namespace).

## DI

```ts
TYPES.WorkspaceService = Symbol.for("IWorkspaceService");
container.bind<IWorkspaceService>(TYPES.WorkspaceService).to(WorkspaceService);
```

## Call sites

| Transport | Call |
| --------- | ---- |
| GraphQL `createWorkspace` | `workspaceService.create(...)` |
| GraphQL `getWorkspace` | `workspaceService.getById(...)` |
| HTTP handler | same short verbs |

Resolvers and routes stay thin — one service call after mapping args.

## Done when

- `I*Service` + `@injectable()` impl + TYPES + bind
- Authz / tx / outbox live here when needed
- Colocated `*.test.ts` for non-trivial logic
- Repository methods stay persistence verbs
