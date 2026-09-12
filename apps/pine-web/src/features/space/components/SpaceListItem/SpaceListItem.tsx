import KeyboardArrowRightTwoTone from "@mui/icons-material/KeyboardArrowRightTwoTone";
import WorkspacesOutlined from "@mui/icons-material/WorkspacesOutlined";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
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

  const projectsQuery = useFindProjectsQuery(
    { spaceId },
    { enabled: expanded },
  );

  const projects = projectsQuery.data?.findProjects?.rows ?? [];
  const isLoading = expanded && projectsQuery.isPending;

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={<CreateProjectModal spaceId={spaceId} />}
      >
        <ListItemButton
          dense
          selected={selected}
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
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {isLoading ? (
            <ListItem dense sx={{ pl: 4 }}>
              <ListItemText>
                <Skeleton />
              </ListItemText>
            </ListItem>
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
    </>
  );
};
