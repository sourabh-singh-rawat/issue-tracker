import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { updateProject } from "../../reducers/project.reducer";
import { setSnackbarOpen } from "../../reducers/snackbar.reducer";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import StyledDatePicker from "../StyledDatePicker/StyledDatePicker";
import StyledSelect from "../StyledSelect/StyledSelect";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";
import StyledTextField from "../StyledTextField/StyledTextField";
import { useEffect } from "react";
import { setProjectStatus } from "../../reducers/projectOptions.reducer";

const ProjectSettings = () => {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.project);
  const startDate = useSelector((store) => store.project.start_date);
  const endDate = useSelector((store) => store.project.end_date);
  const projectStatus = useSelector(
    (store) => store.projectOptions.projectStatus
  );
  const [selectedTab] = useOutletContext();

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateProject({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, status, end_date, start_date } = project;
    const response = await fetch(
      `http://localhost:4000/api/projects/${project.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          status,
          end_date,
          start_date,
        }),
      }
    );

    if (response.status === 200) dispatch(setSnackbarOpen(true));
  };

  useEffect(() => {
    const fetchProjectStatus = async () => {
      const response = await fetch("http://localhost:4000/api/projects/status");
      const status = await response.json();

      dispatch(setProjectStatus(status));
    };

    fetchProjectStatus();
  }, []);

  return (
    <StyledTabPanel selectedTab={selectedTab} index={104}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item className="lhs" xs={12} md={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Basic Information
            </Typography>
          </Grid>
          <Grid item className="rhs" xs={12} md={8}>
            <Grid container>
              <Grid item xs={12}>
                <StyledTextField
                  name="name"
                  title="Name"
                  value={project.name}
                  onChange={handleChange}
                  helperText="A name for your project"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  name="owner_uid"
                  title="Owner UID"
                  value={project.owner_uid}
                  helperText="This is the UID of the project owner"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  name="id"
                  title="Project ID"
                  value={project.id}
                  helperText="This is the Project ID."
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  name="description"
                  title="Description"
                  value={project.description}
                  onChange={handleChange}
                  helperText="A text description of the project. Max character count is 150"
                  rows={4}
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid container sx={{ marginTop: 3 }}>
          <Grid item className="lhs" xs={12} md={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Detailed Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledTextField
                  name="creation_date"
                  title="Created At"
                  value={
                    project.creation_date
                      ? format(parseISO(project.creation_date), "PPPPpppp")
                      : "loading"
                  }
                  helperText="The day this project was created, this cannot be changed."
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <StyledSelect
                  title="Status"
                  name="status"
                  value={project.status}
                  onChange={handleChange}
                  items={projectStatus}
                  helperText="The current status of your project."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledDatePicker
                  title="Start Date"
                  name="start_date"
                  value={startDate}
                  maxDate={parseISO(endDate)}
                  helperText="The day your project started."
                  onChange={(date) =>
                    dispatch(updateProject({ start_date: date }))
                  }
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledDatePicker
                  title="End Date"
                  name="end_date"
                  value={endDate}
                  minDate={parseISO(startDate)}
                  helperText="The day your project will end. (due date)"
                  onChange={(date) =>
                    dispatch(updateProject({ end_date: date }))
                  }
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: 3, marginBottom: 8 }}>
          <Grid item md={4}></Grid>
          <Grid item md={8}>
            <Button
              variant="contained"
              type="submit"
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </StyledTabPanel>
  );
};

export default ProjectSettings;
