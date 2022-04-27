import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Tab, Tabs } from "@mui/material";

import AppBarContainer from "../../components/appbar/appbar.component";
import TabPanel from "../../components/tabpanel/tabpanel.component";
import ModalWindow from "../../components/modal-window/modal-window.component";
import IssueForm from "../../components/issue-form/issue-form.component";

const Detailed = () => {
  return "detailed";
};

const IssueBoard = () => {
  return "board";
};

const Issues = (props) => {
  const navigate = useNavigate();
  const { view } = useParams();

  /*
    selectedTab can only have 0 or 1 value
    When the user go to /issues/board preselect board 1
  */
  const [selectedTab, setSelectedTab] = useState(view === "board" ? 1 : 0);
  const handleChange = (event, newValue) => {
    const mapIndexToTab = {
      0: "/issues/detailed",
      1: "/issues/board",
    };
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  const renderTabPanel = () => {
    switch (view) {
      case "detailed":
        return (
          <TabPanel selectedTab={selectedTab} index={0}>
            <Detailed />
          </TabPanel>
        );
      case "board":
        return (
          <TabPanel selectedTab={selectedTab} index={1}>
            <IssueBoard />
          </TabPanel>
        );
      default:
        return <p>No item to display</p>;
    }
  };

  return (
    <Fragment>
      <AppBarContainer
        element={
          <ModalWindow>
            <IssueForm />
          </ModalWindow>
        }
      >
        Issues
      </AppBarContainer>
      <Box>
        <Box position="static" sx={{ borderBottom: "3px solid #f4f4f4" }}>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Detailed" />
            <Tab label="Board" />
          </Tabs>
        </Box>
        {renderTabPanel()}
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Grid container spacing={2}>
          <Grid item></Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Issues;
