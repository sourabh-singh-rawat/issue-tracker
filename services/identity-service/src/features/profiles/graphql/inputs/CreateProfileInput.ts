import { builder } from "@pine/server";
import { ProfileGenderEnum } from "@/features/profiles/graphql/objects/ProfileGenderEnum";

export const CreateProfileInput = builder.inputType("CreateProfileInput", {
  fields: (t) => ({
    firstName: t.string({ required: true }),
    middleName: t.string({ required: false }),
    lastName: t.string({ required: false }),
    gender: t.field({ type: ProfileGenderEnum, required: false }),
  }),
});
