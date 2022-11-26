import { Fragment } from "react";

import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiSelect from "@mui/material/Select";
import MuiAvatar from "@mui/material/Avatar";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";

const StyledSelect = styled(MuiSelect)(({ theme }) => {
  return {
    "&.MuiOutlinedInput-root": {
      color: theme.palette.text.primary,
      fontSize: "13px",
      fontWeight: 500,
      textTransform: "capitalize",
      backgroundColor: theme.palette.grey[200],
      borderRadius: "2em",
      "& fieldset": {
        border: `2px solid ${theme.palette.grey[200]}`,
      },
      "&:hover fieldset": {
        backgroundColor: "transparent",
        border: `2px solid ${theme.palette.grey[400]}`,
        transitionDuration: "250ms",
      },
    },
  };
});

const IssueAssigneeSelector = ({
  title,
  value,
  projectMembers,
  handleChange,
  isLoading,
}) => {
  return (
    <Fragment>
      {isLoading ? (
        <MuiGrid container>
          <MuiGrid item xs={12}>
            <MuiSkeleton />
          </MuiGrid>
        </MuiGrid>
      ) : (
        <MuiFormControl>
          {title && (
            <MuiTypography
              variant="body2"
              fontWeight={500}
              sx={{ paddingBottom: 1 }}
            >
              {title}
            </MuiTypography>
          )}
          <StyledSelect
            name="assignee_id"
            size="small"
            value={!value ? 0 : value}
            onChange={handleChange}
          >
            {projectMembers.map(({ id, name, photo_url }) => {
              return (
                <MuiMenuItem
                  key={id}
                  value={id}
                  sx={{ fontSize: "13px", fontWeight: 500 }}
                >
                  <MuiGrid container columnSpacing={1}>
                    <MuiGrid item>
                      <MuiAvatar
                        sx={{ width: "20px", height: "20px" }}
                        src={photo_url}
                      ></MuiAvatar>
                    </MuiGrid>
                    <MuiGrid item>{name}</MuiGrid>
                  </MuiGrid>
                </MuiMenuItem>
              );
            })}
            <MuiMenuItem value={0}>
              <MuiGrid
                container
                columnSpacing={1}
                sx={{ alignItems: "center" }}
              >
                <MuiGrid item>
                  <MuiAvatar sx={{ width: "20px", height: "20px" }} />
                </MuiGrid>
                <MuiGrid item>
                  <MuiTypography
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: "13px" }}
                  >
                    Unassigned
                  </MuiTypography>
                </MuiGrid>
              </MuiGrid>
            </MuiMenuItem>
          </StyledSelect>
        </MuiFormControl>
      )}
    </Fragment>
  );
};

export default IssueAssigneeSelector;
