---
name: web-feature
description: >
  React features in pine-web / identity-web: TanStack routes, .gql ops, codegen,
  Zustand. Triggers: add page, route, CreateIssue.gql, gen:gql, gen:api.
---

# Web feature

Primary reference: `apps/pine-web`. Stack: React 19, Vite, MUI, TanStack Router/Query, Zustand, GraphQL codegen, Hey API.

No `@pine/forms` — use `@pine/ui` plus app `shared/` / feature components.

GraphQL **field** names are owned by the server (`graphql`). REST ops follow `http-route` `operationId`s. Client operations must match the server identifier.

## Layout

```text
src/
  features/<domain>/{components,pages,store}/
  routes/(no-auth)|_authenticated/   # file routes; thin (page import only)
  graphql/<domain>/*.gql             # ops only; folder = server feature / resource
  __generated__/{gql,api,routeTree.gen.ts}  # never hand-edit
  shared/  bootstrap/
```

`src/graphql/<domain>/` uses the same name as the owning server feature (`workspaces`, `tenants`, `identities`). Prefer plural resource folders for new entity ops. Legacy singular folders (`issue`, `project`) stay until a dedicated rename.

## Slice

1. **UI** under `features/<domain>/`; export from feature `index.ts`. Scope the folder to the same problem as the server feature — do not mix unrelated aggregates.
2. **Route** under correct auth group; match existing URL patterns (`i.$issueId`, `$workspaceId`, …).

```ts
export const Route = createFileRoute("/_authenticated/i/$issueId")({
  component: IssuePage,
});
```

3. **GQL** in `src/graphql/<domain>/X.gql`. Operation name = PascalCase of the **server field**. File name = that operation.

| Server field | Client file | Operation |
| ------------ | ----------- | --------- |
| `getWorkspace` | `GetWorkspace.gql` | `query GetWorkspace` |
| `getWorkspaces` | `GetWorkspaces.gql` | `query GetWorkspaces` |
| `createWorkspace` | `CreateWorkspace.gql` | `mutation CreateWorkspace` |

Do not invent a parallel client name (`query FindWorkspace` over field `getWorkspace`). Existing `FindIssue` / `FindProjects` match current `find*` server fields — leave them until the schema is renamed.

Import hooks from `__generated__/gql/*`.

```bash
pnpm schemas:compose
pnpm --filter @pine/pine-web gen        # gql + api
```

Schema for codegen: `services/api-gateway/dist/supergraph.graphql` (must exist). Same `gen` / `gen:gql` / `gen:api` pattern on `identity-web` and `platform-web`.

4. **State:** server → generated React Query hooks; UI → existing Zustand under feature `store/`.

## Hard rules

- Regenerated clients only — no hand-copied server types
- **Use generated React Query hooks only** — `useXQuery` / `useXMutation` from `@generated/api/@tanstack/react-query.gen` or `@generated/gql`. Never `useQuery({ ...verifyEmailOptions(...) })` (or any `useQuery`/`useMutation` + `*Options`/`*Mutation` factory) in components. Factories are for prefetch/queryClient/tests only.
- **Never destructure query/mutation results** — assign the hook return value and use properties (`const projectQuery = useFindProjectQuery(...); projectQuery.data`). Enforced by `pine/no-destructure-query-mutation` in oxlint.
- Routes stay thin; UI lives in features
- Prefer `@pine/ui` + existing MUI + `shared` primitives over new kits
- Build check: `pnpm exec turbo run build --filter=@pine/pine-web`
