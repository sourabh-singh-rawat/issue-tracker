import MuiContainer from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { CreateProjectInput } from "@generated/gql/graphql";
import { useCreateProjectMutation, useFindProjectsQuery } from "@generated/gql";
import { PrimaryButton, TextField, useSnackbar } from "@shared";

type ProjectFormValues = {
  name: string;
};

type ProjectFormProps = {
  spaceId: string;
  onSuccess?: () => void;
};

export const ProjectForm = ({ spaceId, onSuccess }: ProjectFormProps) => {
  const messageBar = useSnackbar();
  const queryClient = useQueryClient();
  const createProjectMutation = useCreateProjectMutation();

  const defaultValues: ProjectFormValues = useMemo(() => ({ name: "" }), []);
  const form = useForm({
    defaultValues,
    mode: "all",
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = async ({ name }) => {
    const input: CreateProjectInput = {
      spaceId,
      name,
    };

    try {
      await createProjectMutation.mutateAsync({ input });
      await queryClient.invalidateQueries({
        queryKey: useFindProjectsQuery.getKey({ spaceId }),
      });
      messageBar.success("Created project successfully");
      onSuccess?.();
    } catch (error) {
      messageBar.error(error instanceof Error ? error.message : "Failed to create project");
    }
  };

  return (
    <MuiContainer component="form" onSubmit={form.handleSubmit(onSubmit)} disableGutters>
      <Grid2 spacing={2} container>
        <Grid2 size={12}>
          <TextField
            name="name"
            label="Name"
            form={form}
            placeholder="e.g. Unity Game, Tools, Website"
          />
        </Grid2>
        <Grid2 size={12}>
          <PrimaryButton type="submit" label="Create" />
        </Grid2>
      </Grid2>
    </MuiContainer>
  );
};
