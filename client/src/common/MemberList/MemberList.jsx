import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMembers } from "../../features/project/project.slice";
import { useGetProjectMembersQuery } from "../../features/project/project.api";
import MuiAvatar from "@mui/material/Avatar";
import List from "../List";
import MuiTypography from "@mui/material/Typography";

export default function MemberList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { rows, rowCount, pageSize } = useSelector(
    (store) => store.project.members
  );
  const projectMembers = useGetProjectMembersQuery(id);

  useEffect(() => {
    if (projectMembers.data) dispatch(setMembers(projectMembers.data));
  }, [projectMembers.isSuccess]);

  const columns = [
    {
      flex: 0.3,
      field: "name",
      headerName: "Name",
      minWidth: 300,
      renderCell: ({ id, value }) => {
        return (
          <Fragment>
            <MuiAvatar
              sx={{ width: "32px", height: "32px", marginRight: "10px" }}
            >
              {value.match(/\b(\w)/g)[0]}
            </MuiAvatar>
            <Link to={`/profile/${id}`} style={{ textDecoration: "none" }}>
              <MuiTypography
                variant="body2"
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "none!important",
                  },
                }}
              >
                {value}
              </MuiTypography>
            </Link>
          </Fragment>
        );
      },
    },
    {
      flex: 0.3,
      field: "email",
      headerName: "Email",
      minWidth: 300,
    },
    { field: "role", headerName: "Role", minWidth: 200 },
  ];

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      pageSize={pageSize}
      getRowId={(row) => row.user_id}
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] },
      }}
    />
  );
}