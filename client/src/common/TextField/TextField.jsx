import { Fragment } from "react";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";

export default function TextField({ title, name, ...otherProps }) {
  return (
    <Fragment>
      <MuiTypography variant="body2" fontWeight={600} paddingBottom={1}>
        {title}
      </MuiTypography>
      <MuiTextField
        name={name && name.toLowerCase()}
        size="small"
        sx={{
          input: { fontSize: "14px" },
          "input:disabled": {
            color: "#eff0f2",
            backgroundColor: "#eff0f2",
          },
          ".MuiFormHelperText-contained": {
            fontSize: "14px",
            marginLeft: 0,
          },
          ".MuiInputBase-root": {
            fontSize: "14px",
          },
        }}
        {...otherProps}
        fullWidth
      />
    </Fragment>
  );
}