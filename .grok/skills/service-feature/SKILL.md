---
name: service-feature
description: >
  Backend feature slice in services/*: feature folders, DI TYPES, wire repository +
  service + GraphQL or HTTP. Triggers: new feature, DI, feature module, container bind.
---

# Service feature

One **feature folder** = one **problem**. Wire the layers; do not re-implement them here.

| Layer | Skill |
| ----- | ----- |
| Repository / Drizzle tables | `repository` |
| Application service / authz / outbox | `service` |
| GraphQL fields | `graphql` |
| HTTP routes | `http-route` |
| NATS publish / consumers | `events` |
| Naming (all layers) | `AGENTS.md` |

Canonical slice: `platform-service` `features/organizations`. Canonical HTTP feature: `authorization-service` `features/authorization`.

## Layout

```text
services/<svc>/src/
  features/<feature>/{services,graphql|routes,schemas,repositories,consumers,errors}/
  db/tables/
  integrations/
  bootstrap/{container-types,container,db,broker,logger}.ts
  main.ts
```

## Feature folders — one problem

| Kind | Folder | Examples |
| ---- | ------ | -------- |
| Entity aggregate | plural kebab-case | `organizations`, `identities`, `tenants` |
| Use-case / protocol | the problem | `signin`, `oauth`, `verification`, `attachment-upload` |
| Foreign projection | source entity name | `identities`, `tenants` in a consuming service |

**Keep together:** aggregate + relations/preferences + transport + repos + services + errors.

**Split** when the lifecycle differs (`attachment` vs `attachment-upload`; foreign projection vs local aggregate).

**Do not:** dump two aggregates in one folder; one feature per field; new singular entity folders (`issue`). Legacy singular folders stay until a dedicated rename.

## Names by layer (summary)

| Layer | One | Many | Create | Update | Delete |
| ----- | --- | ---- | ------ | ------ | ------ |
| Repository | `findById` → null | `findMany` | `save` | `update` | `softDelete` |
| Service | `getById` throws | `list` | `create` | `update` | `delete` |
| GraphQL / HTTP | `getOrganization` | `getOrganizations` | `createOrganization` | `updateOrganization` | `deleteOrganization` |

Public operation: filename = field or `operationId` = client `.gql` / OpenAPI name. Details in `repository`, `service`, `graphql`, `http-route`.

## Recipe

1. Table (if needed) → `repository`
2. `IFooRepository` + `FooRepository` + TYPES + bind → `repository`
3. `IFooService` + `FooService` + TYPES + bind → `service` (tx / events / authz here)
4. Transport in the **same** feature:
   - GraphQL → `graphql`
   - HTTP → `http-route`
5. Async → `events` (`createCloudEvent` + publisher / outbox; consumers under `consumers/`)
6. Colocated `*.test.ts` for non-trivial service logic

```ts
TYPES.OrganizationRepository = Symbol.for("IOrganizationRepository");
TYPES.OrganizationService = Symbol.for("IOrganizationService");
container.bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(OrganizationRepository);
container.bind<IOrganizationService>(TYPES.OrganizationService).to(OrganizationService);
```

## Imports

| Need | From |
| ---- | ---- |
| Server / routes / logger | `@pine/server` |
| Bus | `@pine/events` |
| Persistence | Drizzle `src/db/` + feature repositories |
| Authz | `@pine/authorization` |
| Outbox | `@pine/outbox` |
| Enums / errors | `@pine/common`, `@pine/errors` |

**Forbidden:** `@pine/server-core`, `@pine/event-bus`, `@pine/orm`, `@pine/comm`, TypeORM.

## Service-specific

**Identity HTTP:** IdP behind `IIdentityProvider` / `IOAuthProvider` in `integrations/` — routes via `http-route`.

**Notification email:** `integrations/email/{IMailer,NodeMailer}`; `TYPES.Mailer`; `bootstrap/mailer.ts`.

## Drizzle / migrations

Change table TS only. **Do not** generate/apply migrations unless the user asks. Command from `AGENTS.md`.

## Done when

- Feature folder matches the problem
- Repository + service + transport skills satisfied
- TYPES + bind + barrels wired
- `pnpm exec turbo run build --filter=@pine/<service>` green
