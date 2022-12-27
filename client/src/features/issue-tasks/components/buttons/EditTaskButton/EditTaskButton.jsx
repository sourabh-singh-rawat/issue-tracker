/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import MuiIconButton from '@mui/material/IconButton';
import MuiEditIcon from '@mui/icons-material/Edit';
import theme from '../../../../../config/mui.config';

function EditTaskButton({ onClick }) {
  return (
    <MuiIconButton
      sx={{
        color: theme.palette.grey[400],
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        ':hover': {
          color: theme.palette.grey[600],
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
      }}
      onClick={onClick}
      disableRipple
    >
      <MuiEditIcon />
    </MuiIconButton>
  );
}

export default EditTaskButton;