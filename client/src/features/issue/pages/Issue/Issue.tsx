import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Tab from "../../../../common/components/Tab";
import Tabs from "../../../../common/components/Tabs";
import {
  useGetIssuePriorityListQuery,
  useGetIssueQuery,
  useGetIssueStatusListQuery,
  useUpdateIssueMutation,
} from "../../../../api/generated/issue.api";
import { useAppDispatch } from "../../../../common/hooks";
import { setIssuePriority, setIssueStatus } from "../../issue.slice";
import TextButton from "../../../../common/components/buttons/TextButton";
import { useMessageBar } from "../../../message-bar/hooks";
import Title from "../../../../common/components/Title";

import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

export default function Issue() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { showSuccess, showError } = useMessageBar();
  const [issue, setIssue] = useState({ name: "", updatedAt: "" });

  const { data, ...issueRequest } = useGetIssueQuery({ id });
  const { data: statusList, ...statusListRequest } =
    useGetIssueStatusListQuery();
  const { data: priorityList, ...priorityListRequest } =
    useGetIssuePriorityListQuery();
  const [updateIssue, updateIssueOptions] = useUpdateIssueMutation();

  const tabName = location.pathname.split("/")[3] || "overview";
  const mapTabToIndex: { [k: string]: number } = {
    overview: 0,
    tasks: 1,
    attachments: 2,
    comments: 3,
    settings: 4,
  };
  const [selectedTab, setSelectedTab] = useState(mapTabToIndex[tabName]);

  useEffect(() => {
    if (updateIssueOptions.isSuccess) {
      showSuccess("Issue title updated successfully");
    }

    if (updateIssueOptions.isError) {
      showError("Failed to update issue title");
    }
  }, [updateIssueOptions.isSuccess]);

  useEffect(() => {
    if (statusListRequest.isSuccess) dispatch(setIssueStatus(statusList));
  }, [statusList]);

  useEffect(() => {
    if (priorityListRequest.isSuccess) dispatch(setIssuePriority(priorityList));
  }, [priorityList]);

  useEffect(() => {
    setSelectedTab(mapTabToIndex[tabName]);
  }, [id, tabName]);

  useEffect(() => {
    if (issueRequest.isSuccess) setIssue(data?.rows);
  }, [data]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab: { [k: number]: string } = {
      0: `/issues/${id}/overview`,
      1: `/issues/${id}/tasks`,
      2: `/issues/${id}/attachments `,
      3: `/issues/${id}/comments`,
      4: `/issues/${id}/settings`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <MuiGrid container>
      <MuiGrid xs={12} item>
        <MuiGrid xs={12} item sx={{ marginLeft: theme.spacing(-1) }}>
          <TextButton
            label="Back to all issues"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/issues")}
          />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <Title
            page={issue}
            setPage={setIssue}
            updateQuery={async () => {
              if (!id) return;
              await updateIssue({ id, body: { name: issue.name } });
            }}
          />
        </MuiGrid>
        <MuiGrid xs={12}>
          <MuiGrid sx={{ color: theme.palette.text.primary }} xs={12} item>
            <MuiBreadcrumbs separator="•">
              {/* {isLoading ? <MuiSkeleton width="80px" /> : statusSelector} */}
              {/* {isLoading ? <MuiSkeleton width="80px" /> : prioritySelector} */}
              {issueRequest.isLoading ? (
                <MuiSkeleton width="80px" />
              ) : (
                <MuiTypography component="span" variant="body2">
                  Issue
                  {/* {type.slice(1, -1)} */}
                </MuiTypography>
              )}
              {issueRequest.isLoading ? (
                <MuiSkeleton width="80px" />
              ) : (
                <MuiTypography component="span" variant="body2">
                  {issue?.updatedAt && dayjs(issue?.updatedAt).fromNow()}
                </MuiTypography>
              )}
            </MuiBreadcrumbs>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>

      <MuiGrid xs={12} item>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab isLoading={issueRequest.isLoading} label="Overview" value={0} />
          <Tab isLoading={issueRequest.isLoading} label="Tasks" value={1} />
          <Tab
            isLoading={issueRequest.isLoading}
            label="Attachments"
            value={2}
          />
          <Tab isLoading={issueRequest.isLoading} label="Comments" value={3} />
          <Tab isLoading={issueRequest.isLoading} label="Settings" value={4} />
        </Tabs>
      </MuiGrid>
      <MuiGrid xs={12} item>
        <Outlet
          context={{
            id,
            selectedTab,
            page: issue,
            setPage: setIssue,
          }}
        />
      </MuiGrid>
    </MuiGrid>
  );
}
