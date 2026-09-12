import KeyboardArrowRightTwoTone from "@mui/icons-material/KeyboardArrowRightTwoTone";
import WorkspacesOutlined from "@mui/icons-material/WorkspacesOutlined";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useFindProjectsQuery } from "@generated/gql";
import { CreateProjectModal, ProjectListItem } from "@features/project";
import { useSpaceStore } from "../../store";

type SpaceListItemProps = {
  spaceId: string;
  name: string;
  workspaceId: string;
};

export const SpaceListItem = ({ spaceId, name, workspaceId }: SpaceListItemProps) => {
  const currentSpace = useSpaceStore((s) => s.currentSpace);
  const setCurrentSpace = useSpaceStore((s) => s.setCurrentSpace);
  const selected = currentSpace?.id === spaceId;
  const [expanded, setExpanded] = useState(false);
  const activeViewId = useRouterState({
    select: (s) => s.location.pathname.split("/").pop(),
  });

  const projectsQuery = useFindProjectsQuery(
    { spaceId },
    { enabled: expanded || Boolean(activeViewId) },
  );

  const projectRows = projectsQuery.data?.findProjects?.rows;
  const projects = projectRows ?? [];
  const isLoading = expanded && projectsQuery.isPending;

  useEffect(() => {
    if (!activeViewId || projectsQuery.isPending || !projectRows) {
      return;
    }
    const matchesActiveProject = projectRows.some(
      (project) => project?.id === activeViewId,
    );
    if (!matchesActiveProject) {
      return;
    }
    if (!expanded) {
      setExpanded(true);
    }
    if (currentSpace?.id !== spaceId) {
      setCurrentSpace({
        id: spaceId,
        name,
        workspaceId,
      });
    }
  }, [
    activeViewId,
    currentSpace?.id,
    expanded,
    name,
    projectRows,
    projectsQuery.isPending,
    setCurrentSpace,
    spaceId,
    workspaceId,
  ]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", pr: 0.5 }}>
        <ListItemButton
          dense
          selected={selected}
          sx={{ flex: 1, minWidth: 0 }}
          onClick={() => {
            setCurrentSpace({
              id: spaceId,
              name,
              workspaceId,
            });
            setExpanded((prev) => !prev);
          }}
        >
          <ListItemIcon>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: (theme) =>
                  theme.transitions.create("transform", {
                    duration: theme.transitions.duration.shorter,
                  }),
              }}
            >
              <KeyboardArrowRightTwoTone fontSize="small" />
            </Box>
          </ListItemIcon>
          <ListItemIcon>
            <WorkspacesOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
        <CreateProjectModal spaceId={spaceId} />
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {isLoading ? (
            <ListItemButton dense disabled sx={{ pl: 4 }}>
              <ListItemText>
                <Skeleton />
              </ListItemText>
            </ListItemButton>
          ) : (
            projects
              .filter(
                (
                  project,
                ): project is typeof project & {
                  id: string;
                  name: string;
                  spaceId: string;
                } =>
                  Boolean(project?.id) &&
                  Boolean(project?.name) &&
                  Boolean(project?.spaceId),
              )
              .map((project) => (
                <ProjectListItem
                  key={project.id}
                  projectId={project.id}
                  name={project.name}
                  spaceId={project.spaceId}
                  nested
                />
              ))
          )}
        </List>
      </Collapse>
    </Box>
  );
};
