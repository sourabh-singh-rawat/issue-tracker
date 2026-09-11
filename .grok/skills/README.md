# Agent skills

Discovered automatically from `.grok/skills/` (Grok's default project skills path).

Folder name = `name` frontmatter. No `pine-` prefix.

Repo-wide agent rules (migrations, changesets, **feature / repository / service / route-resolver naming**): root [`AGENTS.md`](../../AGENTS.md).

## Backend layers

| Skill                                         | Load when                                      |
| --------------------------------------------- | ---------------------------------------------- |
| [service-feature](./service-feature/SKILL.md) | New feature folder / DI / wire the slice       |
| [repository](./repository/SKILL.md)           | Drizzle table + `I*Repository`                 |
| [service](./service/SKILL.md)                 | `I*Service`, authz, tx, outbox                 |
| [graphql](./graphql/SKILL.md)                 | Pothos fields / compose                        |
| [http-route](./http-route/SKILL.md)           | `HttpRoute` / `operationId` / OpenAPI          |
| [events](./events/SKILL.md)                   | NATS publish / consumers                       |

## Apps & platform

| Skill                                                 | Load when                       |
| ----------------------------------------------------- | ------------------------------- |
| [orientation](./orientation/SKILL.md)                 | Where does X live / ownership   |
| [dev-loop](./dev-loop/SKILL.md)                       | Run, build, test, compose       |
| [web-feature](./web-feature/SKILL.md)                 | React routes / `.gql` / codegen |
| [changeset-release](./changeset-release/SKILL.md)     | Changeset / calver release      |
| [docker-infra](./docker-infra/SKILL.md)               | Local compose / Ory             |
| [k8s](./k8s/SKILL.md)                                 | Helm / cluster                  |
| [observability](./observability/SKILL.md)             | OTEL / Alloy                    |

## Dead → live packages

`server-core`→`@pine/server` · `event-bus`→`@pine/events` · `comm`→notification-service `integrations/email` · `forms`→`@pine/ui`

## Missing skills (backlog)

| Skill | Why |
| ----- | --- |
| `identity-auth` | Kratos / Hydra / session / OAuth deep dive beyond `http-route` |
| `authorization` | Keto namespaces, `requirePermission`, relation tuples |
| `outbox` | `@pine/outbox` schedule / worker / cleanup |
| `drizzle` | Shared table/column/migration workflow across services |
| `testing` | Vitest patterns, DI test doubles, route/resolver tests |
| `schema-codegen` | `schemas:compose`, `gen:gql`, `gen:api` end-to-end |
| `shared-packages` | When to extract `@pine/*` vs keep service-local |
