import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Menu, MenuItem, Typography } from "@mui/material";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

import DeleteProject from "../DeleteProject";

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const ActionButton = ({ id }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Fragment>
      <Button onClick={handleClick} disableRipple>
        <MoreHoriz sx={{ color: "text.primary" }} />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          key="edit"
          onClick={() => {
            handleClose();
            navigate(`/projects/${id}/settings`);
          }}
          disableRipple
        >
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <DeleteProject id={id} />
      </Menu>
    </Fragment>
  );
};

export default ActionButton;
