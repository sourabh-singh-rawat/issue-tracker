import WorkspacesOutlined from "@mui/icons-material/WorkspacesOutlined";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
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

  return (
    <ListItemButton
      dense
      selected={selected}
      onClick={() => {
        setCurrentSpace({
          id: spaceId,
          name,
          workspaceId,
        });
      }}
    >
      <ListItemIcon>
        <WorkspacesOutlined fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  );
};
