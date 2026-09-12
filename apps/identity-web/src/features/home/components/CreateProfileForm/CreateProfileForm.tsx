import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUserQueryKey } from "@generated/api/@tanstack/react-query.gen";
import { useCreateProfileMutation } from "@generated/gql/hooks";
import { Form, FormItem, getErrorMessage, TextInput, useSnackbar } from "@shared/ui";
import { GenderRadioGroup } from "../GenderRadioGroup";

type GenderValue = "MALE" | "FEMALE" | "UNSPECIFIED";

const isGenderValue = (value: string | null | undefined): value is GenderValue =>
  value === "MALE" || value === "FEMALE" || value === "UNSPECIFIED";

export const CreateProfileForm = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const createProfileMutation = useCreateProfileMutation();

  const form = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
    },
    onSubmit: async ({ value }) => {
      if (!value.firstName.trim()) {
        snackbar.error("Enter a first name.");
        return;
      }

      if (!isGenderValue(value.gender)) {
        snackbar.error("Select a gender.");
        return;
      }

      try {
        await createProfileMutation.mutateAsync({
          input: {
            firstName: value.firstName.trim(),
            middleName: value.middleName.trim() || undefined,
            lastName: value.lastName.trim() || undefined,
            gender: value.gender,
          },
        });
        await queryClient.invalidateQueries({ queryKey: getCurrentUserQueryKey() });
        snackbar.success("Profile created.");
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Could not create your profile. Please try again."));
      }
    },
  });

  return (
    <Form form={form}>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <FormItem name="firstName">
              <TextInput label="First name" autoComplete="given-name" />
            </FormItem>
          </Grid>
          <Grid size={12}>
            <FormItem name="middleName">
              <TextInput label="Middle name" autoComplete="additional-name" />
            </FormItem>
          </Grid>
          <Grid size={12}>
            <FormItem name="lastName">
              <TextInput label="Last name" autoComplete="family-name" />
            </FormItem>
          </Grid>
        </Grid>

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 2,
          }}
        >
          <FormItem name="gender">
            <GenderRadioGroup />
          </FormItem>
        </Paper>

        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" disabled={createProfileMutation.isPending}>
            {createProfileMutation.isPending ? "Saving…" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};
