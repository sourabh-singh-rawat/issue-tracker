import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { setTeamList } from "../../reducers/teamList.reducer";

const TeamList = () => {
  const { rows } = useSelector((store) => store.teamList);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/api/teams");
      const { rows, rowCount } = await response.json();

      dispatch(setTeamList({ rows, rowCount }));
    })();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      minWidth: 200,
      flex: 0.3,
      renderCell: (params) => (
        <Link
          to={`/teams/${params.row.id}/overview`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "text.subtitle1",
              fontWeight: "bold",
              "&:hover": {
                color: "primary.main",
                textDecoration: "none!important",
              },
            }}
          >
            {params.row.name}
          </Typography>
        </Link>
      ),
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "creation_date",
      headerName: "CREATED AT",
      width: 200,
      flex: 0.2,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "eee, PP") : "-",
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      sx={{
        fontSize: "inherit",
        color: "primary.text2",
        border: 0,
        ".MuiDataGrid-cell": {
          color: "text.subtitle1",
          border: 0,
          boxShadow: 0,
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        ".MuiDataGrid-columnHeaders": {
          borderBottom: "2px solid #343a27",
        },
      }}
      autoHeight
      disableSelectionOnClick
    />
  );
};

export default TeamList;
