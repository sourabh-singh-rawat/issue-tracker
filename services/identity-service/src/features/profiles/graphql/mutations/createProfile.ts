import { UnauthorizedError } from "@pine/common";
import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { CreateProfileInput } from "@/features/profiles/graphql/inputs/CreateProfileInput";
import { ProfileObject } from "@/features/profiles/graphql/objects/ProfileObject";
import type { IProfileService } from "@/features/profiles/services";

builder.mutationFields((t) => ({
  createProfile: t.field({
    type: ProfileObject,
    authScopes: {
      identityRequired: true,
    },
    args: {
      input: t.arg({ type: CreateProfileInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IProfileService>(TYPES.ProfileService);
      if (!ctx.identity) throw new UnauthorizedError();

      return service.create({
        identityId: ctx.identity.id,
        firstName: input.firstName,
        middleName: input.middleName ?? undefined,
        lastName: input.lastName ?? undefined,
        gender: input.gender ?? undefined,
      });
    },
  }),
}));
