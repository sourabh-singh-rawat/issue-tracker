import { Tab } from "@mui/material";

const StyledTab = (props) => {
  return (
    <Tab
      {...props}
      sx={{
        color: "primary.main",
        textTransform: "none",
      }}
    ></Tab>
  );
};

export default StyledTab;
