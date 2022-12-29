/* eslint-disable react/jsx-curly-newline */
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatISO } from 'date-fns';

import MuiGrid from '@mui/material/Grid';

import TabPanel from '../../../../common/tabs/TabPanel';
import PrimaryButton from '../../../../common/buttons/PrimaryButton';

import { updateProject } from '../../slice/project.slice';
import { setMessageBarOpen } from '../../../message-bar/slice/message-bar.slice';
import { useUpdateProjectMutation } from '../../api/project.api';
import ProjectDetailSettings from '../../components/ProjectDetailSettings';
import CoreSettings from '../../components/CoreSettings/CoreSettings';
import TimelineSettings from '../../components/TimelineSettings';

function ProjectSettings() {
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const project = useSelector((store) => store.project.settings);

  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateProject({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line object-curly-newline
    const { name, description, status, endDate, startDate } = project;

    await updateProjectMutation({
      id: project.id,
      // eslint-disable-next-line object-curly-newline
      body: { name, description, status, endDate, startDate },
    });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel index={4} selectedTab={selectedTab}>
      <MuiGrid
        component="form"
        rowSpacing={5}
        container
        onSubmit={handleSubmit}
      >
        <MuiGrid xl={7} xs={12} item>
          <ProjectDetailSettings
            description={project.description}
            handleChange={handleChange}
            isLoading={project.isLoading}
            name={project.name}
            status={project.status}
          />
        </MuiGrid>
        <MuiGrid xl={7} xs={12} item>
          <TimelineSettings
            createdAt={project.createdAt}
            endDate={project.endDate}
            handleEndDateChange={(date) =>
              dispatch(updateProject({ endDate: formatISO(date) }))
            }
            handleStartDateChange={(date) =>
              dispatch(updateProject({ startDate: formatISO(date) }))
            }
            startDate={project.startDate}
          />
        </MuiGrid>
        <MuiGrid xl={7} xs={12} item>
          <CoreSettings
            id={project.id}
            isLoading={project.isLoading}
            ownerId={project.ownerId}
          />
        </MuiGrid>

        <MuiGrid sx={{ marginBottom: 8 }} xs={12} item>
          <MuiGrid container>
            <MuiGrid md={4} item />
            <MuiGrid md={8} item>
              <PrimaryButton label="Save Changes" type="submit" />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}

export default ProjectSettings;
