import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import {
  useGetWorkspaceQuery,
  useGetWorkspacesQuery,
  useUpdateWorkspaceMutation,
} from "@generated/gql";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { getErrorMessage, useSnackbar } from "@shared/ui";
import type { SyntheticEvent } from "react";
import { WorkspaceRelations } from "./WorkspaceRelations";
import { WorkspaceRoles } from "./WorkspaceRoles";

type WorkspaceDetailTab = "overview" | "relations" | "roles";

const formatDateTime = (value: unknown): string => {
  if (value == null) {
    return "—";
  }
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }
    return date.toLocaleString();
  }
  return "—";
};

const isWorkspaceDetailTab = (value: unknown): value is WorkspaceDetailTab =>
  value === "overview" || value === "relations" || value === "roles";

const workspaceDetailTabs: ReadonlyArray<{ value: WorkspaceDetailTab; label: string }> = [
  { value: "overview", label: "Overview" },
  { value: "relations", label: "Relations" },
  { value: "roles", label: "Roles" },
];

type ParentWorkspaceFieldProps = {
  workspaceId: string;
  tenantId: string;
  parentWorkspaceId: string | null;
};

const ParentWorkspaceField = ({
  workspaceId,
  tenantId,
  parentWorkspaceId,
}: ParentWorkspaceFieldProps) => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const updateWorkspaceMutation = useUpdateWorkspaceMutation();
  const workspacesQuery = useGetWorkspacesQuery(
    { tenantId },
    {
      select: (data) => data.getWorkspaces ?? [],
      enabled: Boolean(tenantId),
    },
  );

  const parentOptions = (workspacesQuery.data ?? []).filter(
    (workspace) => workspace.id && workspace.id !== workspaceId,
  );
  const currentParentWorkspaceId = parentWorkspaceId ?? "";

  const handleParentChange = async (nextParentWorkspaceId: string) => {
    if (nextParentWorkspaceId === currentParentWorkspaceId) {
      return;
    }

    try {
      await updateWorkspaceMutation.mutateAsync({
        id: workspaceId,
        input: {
          parentWorkspaceId: nextParentWorkspaceId || null,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["GetWorkspace"] });
      await queryClient.invalidateQueries({ queryKey: ["GetWorkspaces"] });
      snackbar.success("Parent workspace updated");
    } catch (error) {
      snackbar.error(getErrorMessage(error, "Failed to update parent workspace"));
    }
  };

  return (
    <Box>
      <Typography variant="overline" color="text.secondary">
        Parent workspace
      </Typography>
      <FormControl fullWidth size="small" sx={{ mt: 0.5 }}>
        <Select
          id="parentWorkspaceId"
          name="parentWorkspaceId"
          value={currentParentWorkspaceId}
          displayEmpty
          onChange={(event) => {
            void handleParentChange(event.target.value);
          }}
          disabled={workspacesQuery.isPending || updateWorkspaceMutation.isPending}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {parentOptions.map((workspace) => {
            const id = workspace.id;
            if (!id) {
              return null;
            }
            return (
              <MenuItem key={id} value={id}>
                {workspace.name ?? workspace.slug ?? id}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export const WorkspaceDetail = () => {
  const { tenantId, workspaceId } = useParams({
    from: "/_authenticated/tenants_/$tenantId_/workspaces/$workspaceId",
  });
  const { tab } = useSearch({
    from: "/_authenticated/tenants_/$tenantId_/workspaces/$workspaceId",
  });
  const navigate = useNavigate();

  const workspaceQuery = useGetWorkspaceQuery(
    { id: workspaceId },
    {
      select: (data) => data.getWorkspace ?? null,
      enabled: Boolean(workspaceId),
    },
  );

  const workspace = workspaceQuery.data;

  const handleTabChange = (_event: SyntheticEvent, value: string) => {
    if (!isWorkspaceDetailTab(value)) {
      return;
    }
    void navigate({
      to: "/tenants/$tenantId/workspaces/$workspaceId",
      params: { tenantId, workspaceId },
      search: { tab: value },
      replace: true,
    });
  };

  const handleBack = () => {
    void navigate({
      to: "/tenants/$tenantId",
      params: { tenantId },
      search: { tab: "workspaces" },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button size="small" onClick={handleBack} sx={{ mb: 2, px: 0 }}>
          ← Back to workspaces
        </Button>

        {workspaceQuery.isPending ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress size={32} />
          </Box>
        ) : null}

        {workspaceQuery.isError ? (
          <Alert severity="error">
            {getErrorMessage(workspaceQuery.error, "Failed to load workspace")}
          </Alert>
        ) : null}

        {workspaceQuery.isSuccess && !workspace ? (
          <Alert severity="warning">Workspace not found.</Alert>
        ) : null}

        {workspace ? (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mb: 1, alignItems: { sm: "center" }, justifyContent: "space-between" }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ alignItems: { sm: "center" } }}
            >
              <Typography variant="h5" component="h1">
                {workspace.name ?? "Untitled workspace"}
              </Typography>
              <Chip
                size="small"
                label={workspace.isActive ? "Active" : "Inactive"}
                color={workspace.isActive ? "success" : "default"}
                variant={workspace.isActive ? "filled" : "outlined"}
                sx={{ alignSelf: "flex-start" }}
              />
            </Stack>
          </Stack>
        ) : null}
      </Box>

      {workspaceId ? (
        <Box>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label="Workspace detail sections"
            sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
          >
            {workspaceDetailTabs.map((item) => (
              <Tab key={item.value} value={item.value} label={item.label} />
            ))}
          </Tabs>

          {tab === "overview" ? (
            workspace ? (
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      ID
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {workspace.id ?? "—"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Tenant ID
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {workspace.tenantId ?? "—"}
                    </Typography>
                  </Box>
                  {workspace.id && workspace.tenantId ? (
                    <ParentWorkspaceField
                      key={`${workspace.id}:${workspace.parentWorkspaceId ?? ""}`}
                      workspaceId={workspace.id}
                      tenantId={workspace.tenantId}
                      parentWorkspaceId={workspace.parentWorkspaceId ?? null}
                    />
                  ) : null}
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Slug
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
                      {workspace.slug ?? "—"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Description
                    </Typography>
                    <Typography>{workspace.description ?? "No description."}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Created
                    </Typography>
                    <Typography>{formatDateTime(workspace.createdAt)}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Updated
                    </Typography>
                    <Typography>{formatDateTime(workspace.updatedAt)}</Typography>
                  </Box>
                </Stack>
              </Paper>
            ) : null
          ) : null}

          {tab === "relations" ? <WorkspaceRelations workspaceId={workspaceId} /> : null}

          {tab === "roles" ? <WorkspaceRoles workspaceId={workspaceId} /> : null}
        </Box>
      ) : null}
    </Container>
  );
};
