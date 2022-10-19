import { Fragment } from "react";

import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";
import MuiSkeleton from "@mui/material/Skeleton";

const IssueCard = ({ title, count, loading }) => {
  return (
    <Fragment>
      {loading ? (
        <MuiSkeleton
          variant="rectangular"
          height="90px"
          sx={{ borderRadius: "4px" }}
        />
      ) : (
        <MuiBox
          sx={{
            cursor: "pointer",
            padding: "16px",
            minHeight: "60px",
            border: "1px solid #E3E4E6",
            borderRadius: "4px",
            transition: "250ms",
            ":hover": {
              border: "1px solid #CABBA5",
              boxShadow: 4,
            },
          }}
        >
          <MuiTypography
            variant="body2"
            fontWeight={600}
            sx={{
              color: "text.primary",
              textTransform: "capitalize",
            }}
          >
            {title}:
          </MuiTypography>
          <MuiTypography
            variant="h5"
            fontWeight={400}
            sx={{ color: "secondary.main", fontFamily: "Noto Serif Telgu" }}
          >
            {count}
          </MuiTypography>
        </MuiBox>
      )}
    </Fragment>
  );
};

export default IssueCard;
