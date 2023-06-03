/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import MuiEditIcon from '@mui/icons-material/Edit';
import MuiIconButton from '@mui/material/IconButton';
import theme from '../../../../config/mui.config';

function ProjectEditButton({ id }) {
  const navigate = useNavigate();

  return (
    <MuiIconButton
      size="small"
      sx={{
        color: theme.palette.grey[1100],
        transition: 'ease-in-out 0.2s',
        '& svg': { width: '0.875em' },
        '&:hover': { color: theme.palette.primary[900] },
      }}
      disableRipple
      onClick={() => navigate(`/projects/${id}/settings`)}
    >
      <MuiEditIcon />
    </MuiIconButton>
  );
}

export default ProjectEditButton;
