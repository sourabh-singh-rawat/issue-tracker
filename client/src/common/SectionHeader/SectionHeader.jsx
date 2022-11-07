import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

const SectionHeader = ({ title, subtitle, actionButton, noButton }) => {
  return (
    <MuiGrid container>
      <MuiGrid item xs={12} sx={{ display: "flex" }}>
        <MuiTypography variant="h4" sx={{ fontWeight: 600, flexGrow: 1 }}>
          {title}
        </MuiTypography>
        {actionButton}
      </MuiGrid>
      <MuiGrid item sx={{ paddingTop: noButton && "7px" }}>
        <MuiTypography variant="body2" sx={{ color: "text.primary" }}>
          {subtitle}
        </MuiTypography>
      </MuiGrid>
    </MuiGrid>
  );
};

export default SectionHeader;
