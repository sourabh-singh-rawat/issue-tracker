import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { ALL_WORKSPACE_ROLES } from "@pine/authorization";

type WorkspaceRolesProps = {
  workspaceId: string;
};

export const WorkspaceRoles = ({ workspaceId: _workspaceId }: WorkspaceRolesProps) => {
  return (
    <Stack spacing={2}>
      <Typography color="text.secondary">
        Workspace relations are stored in the authorization graph. These labels come from the
        authorization catalog and are not persisted in platform-service.
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small" aria-label="Workspace relations">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Relation</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ALL_WORKSPACE_ROLES.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={role.relation}
                    variant="outlined"
                    sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}
                  />
                </TableCell>
                <TableCell>{role.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
