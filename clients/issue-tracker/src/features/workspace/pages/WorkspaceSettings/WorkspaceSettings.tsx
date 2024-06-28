import React, { useMemo } from "react";
import TabPanel from "../../../../common/components/TabPanel";

import Grid from "@mui/material/Grid";
import { useOutletContext, useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import WorkspaceName from "../../components/WorkspaceName";

import openapi from "../../../../api/generated/openapi.json";
import { useForm } from "react-hook-form";
import AjvFormats from "ajv-formats";
import { ajvResolver } from "@hookform/resolvers/ajv";
import {
  UpdateWorkspaceApiArg,
  useLazyGetWorkspaceQuery,
} from "../../../../api/generated/workspace.api";
import WorkspaceDescription from "../../components/WorkspaceDescription";

export default function WorkspaceSettings() {
  const theme = useTheme();
  const { id } = useParams();
  const { selectedTab } = useOutletContext<{ selectedTab: number }>();
  const [getWorkspace] = useLazyGetWorkspaceQuery();
  const defaultValues: UpdateWorkspaceApiArg["body"] = async () => {
    if (!id) return { name: "", description: "" };
    const { data } = await getWorkspace({ id });

    const row = data?.rows;
    if (row) {
      return {
        name: row.name,
        description: row.description,
      };
    }
  };
  const defaultSchemas: any = useMemo(
    () =>
      openapi.paths["/issue-tracker/workspaces/{id}"].patch.requestBody.content[
        "application/json"
      ].schema,
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
    resolver: ajvResolver(defaultSchemas, {
      formats: { email: AjvFormats.get("email") },
    }),
  });

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <Grid container spacing={2} sx={{ py: theme.spacing(2) }}>
        <Grid item xs={12}>
          <WorkspaceName
            control={control}
            formState={formState}
            defaultSchemas={defaultSchemas}
            handleSubmit={handleSubmit}
          />
        </Grid>
        <Grid item xs={12}>
          <WorkspaceDescription
            control={control}
            formState={formState}
            defaultSchemas={defaultSchemas}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </TabPanel>
  );
}
