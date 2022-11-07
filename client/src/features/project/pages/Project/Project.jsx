import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";

import Tab from "../../../../common/Tab";
import Tabs from "../../../../common/Tabs";
import PageTitleSection from "../../../../common/TitleSection";
import ProjectStatusSelector from "../../components/containers/ProjectStatusSelector";

import {
  setProject,
  setProjectQuick,
  setStatus,
  updateProject,
  updateProjectQuick,
} from "../../project.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";

import {
  useGetStatusQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../project.api";

const Project = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useGetStatusQuery();
  const { id } = useParams();
  const getProject = useGetProjectQuery(id);
  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();
  const tabName = location.pathname.split("/")[3];

  const project = useSelector((store) => store.project.quick);

  const mapPathToIndex = {
    overview: 0,
    issues: 1,
    members: 2,
    activity: 3,
    attatchments: 4,
    settings: 5,
  };

  const mapIndexToTab = {
    0: `/projects/${id}/overview`,
    1: `/projects/${id}/issues`,
    2: `/projects/${id}/members`,
    3: `/projects/${id}/activity`,
    4: `/projects/${id}/attatchments`,
    5: `/projects/${id}/settings`,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[tabName]);

  const handleChange = (e, newValue) => {
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  const updateTitleQuery = () => {
    updateProjectMutation({ id, body: { name: project.name } });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  useEffect(() => {
    if (status.data) dispatch(setStatus(status.data));
  }, [status]);

  useEffect(() => {
    setSelectedTab(mapPathToIndex[tabName]);
  }, [tabName, id]);

  useEffect(() => {
    if (getProject.isSuccess) {
      dispatch(setProjectQuick(getProject.data));
      dispatch(setProject({ ...getProject.data, loading: false }));
    }
  }, [getProject.data]);

  return (
    <MuiGrid container spacing={2}>
      <MuiGrid item xs={12}>
        <PageTitleSection
          page={project}
          loading={project.loading}
          updateTitle={updateProjectQuick}
          updateTitleQuery={updateTitleQuery}
          breadcrumbItems={[
            {
              text: "Projects",
              onClick: () => navigate("/projects"),
            },
            {
              text: project.name,
              onClick: () => navigate(`/projects/${project.id}/overview`),
            },
          ]}
          statusSelector={
            <ProjectStatusSelector
              variant="dense"
              value={project.status}
              handleChange={(e) => {
                const { value } = e.target;
                updateProjectMutation({ id, body: { status: value } });
                dispatch(updateProject({ status: value }));
              }}
            />
          }
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Overview" value={0} />
          <Tab label="Issues" value={1} />
          <Tab label="Members" value={2} />
          <Tab label="Attachments" value={4} />
          <Tab label="Activity" value={3} />
          <Tab label="Settings" value={5} />
        </Tabs>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Outlet context={[selectedTab, id]} />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Project;
