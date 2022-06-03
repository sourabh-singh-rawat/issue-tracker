import { useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import StyledAppBar from "../styled-appbar/styled-appbar.component";

const ProjectForm = ({ uid, email = "Unassigned" }) => {
  const [formFields, setFormFields] = useState({
    projectName: "",
    projectDescription: "",
    projectOwnerUID: uid,
    projectOwnerEmail: email,
    startDate: null,
    endDate: null,
  });

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formFields);

    // TODO: Add validation

    await fetch("http://localhost:4000/api/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formFields),
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <StyledAppBar>Create Project</StyledAppBar>
      </Grid>
      <Grid item xs={4} sx={{ margin: 3, marginTop: 0 }}>
        <Box sx={{ marginBottom: 2 }}>
          <Typography>Enter project details</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container columnSpacing={4} rowSpacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="projectName"
                label="Project Name"
                variant="standard"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="projectDescription"
                label="Description"
                variant="standard"
                rows={4}
                onChange={handleChange}
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="projectOwnerEmail"
                label="Owner"
                variant="standard"
                value={email}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                autoFocus={true}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item sm={12}></Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="startDate"
                label="Start Date"
                type="date"
                variant="standard"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} paddingBottom="1em">
              <TextField
                name="endDate"
                label="End Date"
                type="date"
                variant="standard"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                size="large"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Create project
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.user.uid,
    email: state.user.email,
  };
};

export default connect(mapStateToProps)(ProjectForm);
