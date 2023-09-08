/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { styled } from "@mui/material/styles";
import MuiTooltip, { tooltipClasses } from "@mui/material/Tooltip";

const StyledTooltip = styled(({ ...props }) => <MuiTooltip {...props} arrow />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: "13px",
      fontWeight: 600,
    },
  }),
);

function Tooltip({ title, placement, children }) {
  return (
    <StyledTooltip placement={placement} title={title}>
      {children}
    </StyledTooltip>
  );
}

export default Tooltip;
