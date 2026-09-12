---
name: http-route
description: >
  Fastify HTTP routes via @pine/server: HttpRoute, operationId, TypeBox schemas,
  thin handlers. Triggers: HttpRoute, operationId, OpenAPI route, routes/index.
---

# HTTP route

REST / OpenAPI transport. Canonical: `authorization-service` `features/authorization/routes`, `identity-service` `features/verification`, `attachment-service` `features/attachment-upload`.

Domain logic: `service`. Feature slice: `service-feature`. GraphQL counterpart: `graphql`. Naming: `AGENTS.md`.

## Layout

```text
features/<feature>/
  routes/
    checkRelationship.ts   # one operation per file
    index.ts               # export const <feature>Routes: HttpRoute[]
  schemas/
    CheckRelationshipBodySchema.ts
    CheckRelationshipResponseSchema.ts
    index.ts
services/<svc>/src/routes/index.ts   # spread feature route arrays
```

## One public identifier

Filename = exported const = `operationId`. Client codegen uses that name.

| Piece | Example |
| ----- | ------- |
| File | `checkRelationship.ts` |
| Export | `export const checkRelationship` |
| `operationId` | `"checkRelationship"` |
| URL | namespaced path is separate (`/authorization/checkRelationship`) |

Do not invent a second name (`consent.ts` + `operationId: "getConsentChallenge"`). Prefer `getConsentChallenge` for file, export, and `operationId`.

New reads prefer `get*` verbs when the operation is a fetch (`getAttachmentContent`, `getIdentityFromSession`).

## Recipe

```ts
export const checkRelationship: HttpRoute = {
  url: "/authorization/checkRelationship",
  method: "POST",
  schema: {
    tags: ["authorization"],
    summary: "Check a graph relationship",
    operationId: "checkRelationship",
    body: CheckRelationshipBodySchema,
    response: { 200: CheckRelationshipResponseSchema },
  },
  handler: async (request) => {
    const body = request.body;
    if (!Value.Check(CheckRelationshipBodySchema, body)) {
      throw new InvalidCheckRelationshipBodyError();
    }

    const service = container.get<IAuthorizationService>(TYPES.AuthorizationService);
    const allowed = await service.hasRelationship(body);
    return json({ allowed });
  },
};
```

```ts
export const authorizationRoutes: HttpRoute[] = [
  checkRelationship,
  ensureRelationship,
  deleteRelationship,
  listRelationships,
];
```

Register in the service `src/routes/index.ts` (spread into the server route list).

## Rules

- TypeBox schemas under `features/<feature>/schemas/`; `{ additionalProperties: false }` on bodies
- Validate body/query in the handler (or rely on framework schema); throw feature errors on bad input
- Handler stays thin: map args → **one** service method → `json(response)` / cookies
- Call short service verbs (`service.create`, `service.hasRelationship`) — do not re-implement domain logic
- Auth identity from `request.identity` when the route is authenticated; throw `UnauthorizedError` if missing
- OpenAPI tags/summary/description required for public routes

## Done when

- File = export = `operationId`
- Feature `*Routes` array + service `routes/index.ts` wired
- Schemas colocated; handler calls the feature service only
