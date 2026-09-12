import FolderOutlined from "@mui/icons-material/FolderOutlined";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { createLink, useRouterState } from "@tanstack/react-router";
import { useProjectStore } from "../../store";

const ProjectListItemLink = createLink(ListItemButton);

type ProjectListItemProps = {
  projectId: string;
  name: string;
  spaceId: string;
  nested?: boolean;
};

export const ProjectListItem = ({
  projectId,
  name,
  spaceId,
  nested = false,
}: ProjectListItemProps) => {
  const viewId = useRouterState({ select: (s) => s.location.pathname.split("/").pop() });
  const setCurrentProject = useProjectStore((s) => s.setCurrentProject);
  const selected = viewId === projectId;

  return (
    <ProjectListItemLink
      to="/v/l/$viewId"
      params={{ viewId: projectId }}
      dense
      selected={selected}
      sx={nested ? { pl: 4 } : undefined}
      onClick={() => {
        setCurrentProject({
          id: projectId,
          name,
          spaceId,
        });
        localStorage.setItem(
          "currentProject",
          JSON.stringify({ id: projectId, name, spaceId }),
        );
      }}
    >
      <ListItemIcon>
        <FolderOutlined fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ProjectListItemLink>
  );
};
