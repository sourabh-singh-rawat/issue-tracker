import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.action-creator";
import { setIssueList } from "../../redux/issues-list/issue-list.action-creator";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";

const IssuesList = (props) => {
  const { dispatch, issueList } = props;
  const [selectedTab, project] = useOutletContext();

  let projectId;
  project ? (projectId = project.id) : (projectId = "");

  const handleCellEditStop = (params, e) => {
    const id = params.id;
    const field = params.field;
    const old = params.value;
    const value = e.target.value;
    const projectId = params.row.project_id;

    if (value && old !== value) {
      fetch(`http://localhost:4000/api/issues/${id}/?projectId=${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value }),
      }).then((response) => {
        if (response.status === 200) dispatch(setSnackbarOpen());
      });
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        return (
          <Link to={`/issue/${params.row.id}`}>
            <Typography
              variant="body2"
              sx={{ textDecoration: "none", color: "primary.text" }}
            >
              {params.row.name}
            </Typography>
          </Link>
        );
      },
      editable: true,
    },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },

    {
      field: "reporter",
      headerName: "Reporter",
      width: 250,
    },
    {
      field: "assignee",
      headerName: "Assigned To",
      width: 250,
    },
    { field: "dueDate", headerName: "Due Date", width: 150 },
    {
      field: "project_id",
      headerName: "Project Id",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
  ];

  useEffect(() => {
    if (projectId) {
      fetch(`http://localhost:4000/api/issues/?projectId=${projectId}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(setIssueList(data));
        });
    } else
      fetch(`http://localhost:4000/api/issues/all`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(setIssueList(data));
        });
  }, [projectId]);

  return (
    <StyledTabPanel selectedTab={selectedTab} index={1}>
      <Box>
        <Grid container sx={{ height: "80vh" }}>
          <Grid item xs={12}>
            <DataGrid
              autoHeight
              rows={issueList}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              getRowId={(row) => {
                return row.id;
              }}
              initialState={{
                sorting: {
                  sortModel: [{ field: "issue_id", sort: "asc" }],
                },
              }}
              onCellEditStop={handleCellEditStop}
              hideFooter
            ></DataGrid>
          </Grid>
        </Grid>
      </Box>
    </StyledTabPanel>
  );
};

const mapStateToProps = (store) => {
  return { issueList: store.issueList.issues };
};

export default connect(mapStateToProps)(IssuesList);
