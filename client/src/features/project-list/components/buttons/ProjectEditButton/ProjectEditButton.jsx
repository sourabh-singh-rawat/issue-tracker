/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from 'react-router-dom';

import MuiIconButton from '@mui/material/IconButton';

import MuiEditIcon from '@mui/icons-material/Edit';
import theme from '../../../../../config/mui.config';

function ProjectEditButton({ id }) {
  const navigate = useNavigate();

  return (
    <MuiIconButton
      size="small"
      sx={{
        color: theme.palette.grey[300],
        transition: 'ease-in-out 0.2s',
        '&:hover': { color: theme.palette.primary.main },
      }}
      disableRipple
      onClick={() => navigate(`/projects/${id}/settings`)}
    >
      <MuiEditIcon />
    </MuiIconButton>
  );
}

export default ProjectEditButton;
