import React, { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateWorkspaceMutation } from "../../../../api/generated/workspace.api";
import AjvFormats from "ajv-formats";
import { ajvResolver } from "@hookform/resolvers/ajv";
import openapi from "../../../../api/generated/openapi.json";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import TextField from "../../../../common/components/forms/TextField";
import ModalFooter from "../../../../common/components/ModalFooter";

interface WorkspaceFormProps {
  handleClose: () => void;
}

export default function WorkspaceForm({ handleClose }: WorkspaceFormProps) {
  const [createWorkspace] = useCreateWorkspaceMutation();
  const defaultValues = useMemo(
    () => ({ name: "Workspace Name", description: "" }),
    [],
  );
  const defaultSchemas: any = useMemo(
    () =>
      openapi.paths["/workspaces"].post.requestBody.content["application/json"]
        .schema,
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
    resolver: ajvResolver(defaultSchemas, {
      formats: { email: AjvFormats.get("email") },
    }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({
    name,
    description,
  }) => {
    await createWorkspace({ body: { name, description } });
    handleClose();
  };

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid rowSpacing={2} container>
        <MuiGrid item xs={12}>
          <TextField
            name="name"
            title="Name"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <TextField
            name="description"
            title="Description"
            control={control}
            formState={formState}
            rows={4}
            isMultiline
          />
        </MuiGrid>
      </MuiGrid>
      <ModalFooter handleClose={handleClose} />
    </MuiContainer>
  );
}
