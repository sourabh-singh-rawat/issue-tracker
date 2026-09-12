---
name: orientation
description: >
  Map the Pine monorepo: which app/service/package owns a domain, package renames,
  where to edit. Triggers: where does X live, monorepo map, which service, package layout.
---

# Orientation

pnpm + Turborepo monorepo. Workspace: `apps/**`, `packages/**`, `services/**`.

## Where to edit

| Change                               | Location                                            |
| ------------------------------------ | --------------------------------------------------- |
| UI                                   | `apps/<web>` (`features/<domain>/`, `src/graphql/<domain>/`) |
| Business rules / API                 | owning `services/<service>/src/features/<problem>/` |
| Shared enum/DTO/error (2+ consumers) | `packages/common` (or other `@pine/*`)              |
| Cross-service async                  | `@pine/events` → `events` skill                      |
| HTTP server / GraphQL / logger       | `@pine/server`                                        |
| Local stack                          | `infra/docker` + root `pnpm dev:infra*`             |
| Repo tooling scripts                 | `tools/scripts/` (`release/`, `changelog/`, `schemas/`, `setup/`, `concat/`) |
| Agent skills                         | `.grok/skills/*/SKILL.md`                           |

Extract to `packages/*` only when **two** services need the same logic.

Feature folders: **one problem per folder** (`service-feature`). Layers: `repository`, `service`, `graphql` / `http-route`. Plural resource (`workspaces`) or use-case (`signin`). Do not edit across unrelated features to “finish” a slice.

## Ownership

| Domain                                    | Owner                                                               |
| ----------------------------------------- | ------------------------------------------------------------------- |
| Auth / IdP / OAuth                        | `identity-service` + Ory (Kratos/Hydra) + `identity-web`            |
| Platform / tenants / workspaces        | `platform-service` + `platform-web`                                 |
| Graph authorization (Keto)                | `authorization-service`                                             |
| Workspaces / projects / issues / statuses | `issues-service` + `pine-web`                                       |
| Attachments                               | `attachment-service`                                                |
| Transactional email / notifications       | `notification-service` (`integrations/email`, not a shared package) |
| Federated GraphQL supergraph              | `api-gateway` (`dist/supergraph.graphql`)                           |
| Client GraphQL ops                        | `apps/*/src/graphql/**/*.gql` (name = server field)                 |

## Apps / services / packages

**Apps:** `pine-web` (primary product UI — issues-focused), `identity-web` (sign-in/registration/consent), `platform-web` (platform admin)

**Services:** `identity-service`, `platform-service`, `authorization-service`, `issues-service`, `attachment-service`, `attachment-scanner-service`, `notification-service`, `api-gateway`, `data-gateway`

| Package                 | Import for                                                       |
| ----------------------- | ---------------------------------------------------------------- |
| `@pine/common`          | enums, DTOs, errors, `uuidv7`                                    |
| `@pine/errors`          | `ApplicationError`                                               |
| `@pine/events`          | NATS, CloudEvents, `publisher.send(event)`, consumers            |
| `@pine/server`          | `FastifyHttpServer`, `PinoLogger`, Pothos `builder`, scalars     |
| `@pine/security`        | JWT, hashing, auth helpers                                       |
| `@pine/observability`   | OTEL bootstrap                                                   |
| `@pine/authorization`   | Keto client, relations, `requirePermission`                      |
| `@pine/identity`        | `requireIdentityId`, identity HTTP client                        |
| `@pine/outbox`          | transactional outbox                                             |
| `@pine/attachment`      | attachment upload client                                         |
| `@pine/ui`              | shared MUI primitives                                            |

## Dead packages (never import)

| Dead                  | Use                                           |
| --------------------- | --------------------------------------------- |
| `@pine/server-core`   | `@pine/server`                                  |
| `@pine/event-bus`     | `@pine/events`                                |
| `@pine/graphql-core`  | `@pine/server` (graphql-schema feature)         |
| `@pine/orm`           | Drizzle (`src/db/`, service repositories)     |
| `@pine/comm`          | `notification-service/src/integrations/email` |
| `@pine/forms`         | app `shared/ui` / feature components          |

Dockerfile turbo `--filter`s must use **current** names only.

## Traps

- Root `README` install steps are legacy; monorepo + `package.json` scripts are source of truth
- Do not hand-edit `**/__generated__/**` or `api-gateway/dist/*`
- Do not search `infra/data/` or `node_modules/` for product code
