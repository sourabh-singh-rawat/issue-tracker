/* eslint-disable no-shadow */
import { Link, useOutletContext, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ImageList, useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import { setIssueAttachments, updateIssue } from "../../issue.slice";
import { useAppSelector } from "../../../../common/hooks";
import TabPanel from "../../../../common/components/TabPanel";
import Description from "../../../../common/components/Description";

// import ImageCard from "../../../issue-attachments/components/ImageCard/ImageCard";
// import { useGetIssueAttachmentsQuery } from "../../../issue-attachments/issue-attachments.api";
// import { useUpdateIssueMutation } from "../../issue.api";

function IssueOverview() {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const issue = useAppSelector((store) => store.issue.info);
  const attachments = useAppSelector((store) => store.issue.attachments);

  // const getIssueAttachments = useGetIssueAttachmentsQuery({ issueId: id });
  // const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();
  const updatePageQuery = async () => {
    // updateIssueMutation({ id, body: { description: issue.description } });
  };

  // useEffect(() => {
  //   if (getIssueAttachments.isSuccess) {
  //     dispatch(setIssueAttachments(getIssueAttachments.data));
  //   }
  // }, [getIssueAttachments.data]);

  // useEffect(() => {
  //   if (isSuccess) dispatch(setMessageBarOpen(true));
  // }, [isSuccess]);

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <MuiGrid spacing={2} container>
        <MuiGrid md={8} item>
          <MuiGrid spacing={2} container>
            <MuiGrid md={12} sm={6} xs={12} item>
              <MuiTypography
                fontWeight={600}
                sx={{ color: theme.palette.grey[200] }}
                variant="body1"
              >
                Assignee:
              </MuiTypography>
              {/* <IssueAssignee /> */}
            </MuiGrid>
            <MuiGrid item>
              <MuiTypography
                fontWeight={600}
                sx={{ color: theme.palette.grey[200] }}
                variant="body1"
              >
                Tasks:
              </MuiTypography>
              <MuiTypography sx={{ marginTop: "6px" }} variant="body2">
                No current incomplete tasks.{" "}
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/issues/${id}/tasks`}
                >
                  <MuiTypography
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                    variant="body2"
                  >
                    Add task.
                  </MuiTypography>
                </Link>
              </MuiTypography>
            </MuiGrid>
            <MuiGrid xs={12} item>
              <MuiTypography
                fontWeight={600}
                sx={{ color: theme.palette.grey[200] }}
                variant="body1"
              >
                Attachments:
              </MuiTypography>
              {attachments.rowCount <= 0 ? (
                <MuiTypography sx={{ marginTop: "6px" }} variant="body2">
                  <MuiTypography variant="body2">
                    No attachments.{" "}
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/issues/${id}/attachments`}
                    >
                      <MuiTypography
                        component="span"
                        sx={{
                          color: theme.palette.primary[800],
                          fontWeight: 600,
                          "&:hover": {
                            transitionDuration: "0.5s",
                            color: theme.palette.primary.dark,
                          },
                        }}
                        variant="body2"
                      >
                        Click to add.
                      </MuiTypography>
                    </Link>
                  </MuiTypography>
                </MuiTypography>
              ) : (
                <ImageList
                  cols={8}
                  rowHeight={75}
                  sx={{ width: "100%" }}
                  variant="quilted"
                >
                  {attachments.rows.map(({ id: attachmentId }) => (
                    <ImageCard
                      key={attachmentId}
                      attachmentId={attachmentId}
                      issueId={id}
                    />
                  ))}
                </ImageList>
              )}
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid md={4} item>
          <MuiGrid md={6} sm={12} xs={12} item>
            <Description
              isLoading={issue.isLoading}
              page={issue}
              updateDescription={updateIssue}
              updateDescriptionQuery={updatePageQuery}
            />
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}

export default IssueOverview;