---
name: graphql
description: >
  Pothos GraphQL via @pine/server: inputs/objects/resolvers, schema compose,
  supergraph. Triggers: CreateIssueInput, mutation, query, schemas:compose, supergraph.
---

# GraphQL (Pothos)

- Builder: `builder` from `@pine/server` (scalars: `DateTimeISO`, `UUID`, `EmailAddress`)
- Service emits `dist/schema.graphql` on start/build
- Compose: `pnpm schemas:compose` → `services/api-gateway/dist/supergraph.graphql`
- Clients: `apps/*/src/graphql/**/*.gql` + app `gen:gql` (`web-feature`)
- Layers: `repository`, `service`, slice wiring `service-feature`, HTTP counterpart `http-route`, naming `AGENTS.md`

Canonical field naming: `platform-service` `features/workspaces`.

## Feature layout

```text
features/<domain>/graphql/
  index.ts              # side-effect imports ONLY (registration)
  inputs/CreateXInput.ts
  objects/XObject.ts
  queries/getX.ts       # one file per field, camelCase = field name
  mutations/createX.ts
```

`src/graphql/schema.ts` imports each domain’s `graphql` barrel. **Missing import ⇒ field absent from schema.** Put GraphQL in the feature that owns the problem — not a shared `graphql/` grab-bag of unrelated aggregates.

## Naming

Field name = filename. Keep the resource (flat schema namespace). New reads use `get*`, not `find*`.

| Thing | Style | Example |
| ----- | ----- | ------- |
| Query (one) | `get{Resource}` | `getWorkspace` |
| Query (many) | `get{Resources}` | `getWorkspaces` |
| Query (caller) | `getMy{Resources}` | `getMyWorkspaces` |
| Mutation | `create` / `update` / `delete{Resource}` | `createWorkspace` |
| GraphQL type | PascalCase | `CreateWorkspaceInput` |
| Input/object files | PascalCase | `CreateWorkspaceInput.ts` |
| Query / mutation modules | camelCase, one field per file | `getWorkspace.ts` |

Resolver calls the **short** service method:

| Field | Service |
| ----- | ------- |
| `createWorkspace` | `workspaceService.create(...)` |
| `getWorkspace` | `workspaceService.getById(...)` |
| `getWorkspaces` | `workspaceService.list(...)` |
| `getMyWorkspaces` | `workspaceService.listMine(...)` |
| `updateWorkspace` | `workspaceService.update(...)` |
| `deleteWorkspace` | `workspaceService.delete(...)` |

Do not add `createIssue` on `IIssueService` because the field is `createIssue`. Existing `findIssue` / `findProjects` / `findIdentities` stay until a dedicated schema rename — do not mix `get` and `find` on the same resource.

## Recipe (mutation)

```ts
export const CreateWorkspaceInput = builder.inputType("CreateWorkspaceInput", {
  fields: (t) => ({
    tenantId: t.string({ required: true }),
    name: t.string({ required: true }),
    slug: t.string({ required: true }),
  }),
});
```

```ts
builder.mutationFields((t) => ({
  createWorkspace: t.field({
    type: WorkspaceObject,
    args: { input: t.arg({ type: CreateWorkspaceInput, required: true }) },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IWorkspaceService>(TYPES.WorkspaceService);
      return service.create(
        {
          tenantId: input.tenantId,
          name: input.name,
          slug: input.slug,
        },
        requireIdentityId(ctx),
      );
    },
  }),
}));
```

Queries: `builder.queryFields`. Auth identity: `ctx.identity` from `src/graphql/context.ts` — don’t invent parallel auth. Transactions and events belong in the service, not the resolver.

## After change

```bash
pnpm schemas:compose
pnpm --filter @pine/pine-web gen:gql   # if UI consumes it; platform-web / identity-web same pattern
```

Never hand-edit `api-gateway/dist` or app `__generated__`.
