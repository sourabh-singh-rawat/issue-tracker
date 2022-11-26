import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import MuiAutocomplete from "@mui/material/Autocomplete";

import TextField from "../../../../common/TextField";
import DatePicker from "../../../../common/DatePicker";
import SectionHeader from "../../../../common/SectionHeader";

import IssueStatusSelector from "../../components/containers/IssueStatusSelector";
import IssuePrioritySelector from "../../components/containers/IssuePrioritySelector";

import { useCreateIssueMutation } from "../../issue.api";
import { useGetProjectsQuery } from "../../../project-list/project-list.api";
import { useGetCollaboratorsQuery } from "../../../collaborator-list/collaborator-list.api";
import IssueAssigneeSelector from "../../../../common/IssueAssigneeSelector";
import { useGetProjectMembersQuery } from "../../../project/project.api";
import { setMembers } from "../../../project/project.slice";
import { updateIssue } from "../../issue.slice";

const IssueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const project = useSelector((store) => store.project.settings);
  const members = useSelector((store) => store.project.members);
  const issue = useSelector((store) => store.issue.info);

  const allProjects = useGetProjectsQuery({
    page: 0,
    pageSize: 10,
    sortBy: "created_at:desc",
  });
  const [createIssue, { isSuccess }] = useCreateIssueMutation();

  const [projects, setProjects] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    due_date: null,
    assignee_id: null,
    project_id: "",
  });

  const getProjectMembersQuery = useGetProjectMembersQuery(project.id);

  useEffect(() => {
    if (getProjectMembersQuery.isSuccess) {
      dispatch(setMembers(getProjectMembersQuery.data));
    }
  }, [getProjectMembersQuery.data]);

  useEffect(() => {
    if (allProjects.isSuccess) setProjects(allProjects.data.rows);
  }, [allProjects.data]);

  useEffect(() => {
    setFormFields({
      ...formFields,
      project_id: project.id,
    });
  }, [project]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormFields({ ...formFields, [name]: value, uid: user.uid });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await createIssue({ body: formFields });
    navigate(`/issues/${data.id}/overview`);
  };

  console.log(formFields);

  return (
    <MuiGrid container gap="20px">
      <MuiGrid item xs={12}>
        <SectionHeader
          title="New Issue"
          subtitle="Issues are problem you need to solve"
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <MuiBox component="form" onSubmit={handleSubmit}>
          <MuiGrid container rowSpacing="20px" columnSpacing={4}>
            <MuiGrid item xs={12} sm={12}>
              <TextField
                name="name"
                title="Name"
                onChange={handleChange}
                fullWidth
                required
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12}>
              <TextField
                name="description"
                title="Description"
                onChange={handleChange}
                helperText="A text description of the issue."
                multiline
                minRows={6}
                fullWidth
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12}>
              {id ? (
                <TextField
                  name="project_id"
                  title="Project"
                  value={project ? project.name : "loading"}
                  disabled
                />
              ) : (
                <Fragment>
                  <MuiTypography
                    variant="body2"
                    sx={{
                      color: "primary.text",
                      paddingBottom: 1,
                      fontWeight: 600,
                    }}
                  >
                    Project
                  </MuiTypography>
                  <MuiAutocomplete
                    disablePortal
                    size="small"
                    options={projects}
                    onChange={(e, selectedProject) => {
                      setFormFields({
                        ...formFields,
                        project_id: selectedProject.id,
                      });
                    }}
                    getOptionLabel={(option) => {
                      return `${option.name}`;
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    required
                  />
                </Fragment>
              )}
            </MuiGrid>
            <MuiGrid item xs={12} sm={12}>
              <IssueAssigneeSelector
                title="Assignee"
                value={issue.assignee_id}
                isLoading={project.isLoading}
                projectMembers={members.rows}
                handleChange={(e) => {
                  const { value } = e.target;
                  setFormFields({ ...formFields, assignee_id: value });
                  dispatch(updateIssue({ assignee_id: value }));
                }}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12} md={6}>
              <TextField
                name="reporter"
                title="Reporter"
                value={user ? user.email : "none"}
                onChange={handleChange}
                helperText="This is the person who created this issue."
                fullWidth
                disabled
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <IssuePrioritySelector
                title="Priority"
                handleChange={handleChange}
                value={formFields.priority}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <DatePicker
                name="due_date"
                title="Due Date"
                minDate={new Date()}
                value={formFields.due_date}
                getOptionLabel={(option) => {
                  return `${option.name}`;
                }}
                onChange={(date) => {
                  return setFormFields({ ...formFields, due_date: date });
                }}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <IssueStatusSelector
                title="Status"
                handleChange={handleChange}
                value={formFields.status}
              />
            </MuiGrid>
            <MuiGrid item xs={12}>
              <MuiButton
                variant="contained"
                type="submit"
                size="large"
                fullWidth
              >
                Create Issue
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiBox>
      </MuiGrid>
    </MuiGrid>
  );
};

export default IssueForm;
