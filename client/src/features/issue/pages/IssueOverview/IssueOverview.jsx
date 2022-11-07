import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useOutletContext } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/TabPanel";
import Description from "../../../../common/Description";
import IssueAssignee from "../../components/containers/IssueAssignee";

import { updateIssue } from "../../issue.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";
import { useUpdateIssueMutation } from "../../issue.api";

const IssueOverview = () => {
  const dispatch = useDispatch();
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();
  const { id } = useParams();
  const [selectedTab] = useOutletContext();
  const issue = useSelector((store) => store.issue.info);

  const updatePageQuery = async () => {
    updateIssueMutation({ id, body: { description: issue.description } });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={0}>
      <MuiGrid container columnSpacing={2} rowSpacing={2}>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body1" fontWeight={500}>
            Description:
          </MuiTypography>
          <Description
            page={issue}
            loading={issue.loading}
            updateDescription={updateIssue}
            updateDescriptionQuery={updatePageQuery}
          />
        </MuiGrid>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body1" fontWeight={500}>
            Assignee:
          </MuiTypography>
          <IssueAssignee />
        </MuiGrid>
        <MuiGrid item xs={12} sm={12} md={6}>
          <MuiTypography variant="body1" fontWeight={500}>
            Tasks:
          </MuiTypography>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default IssueOverview;
