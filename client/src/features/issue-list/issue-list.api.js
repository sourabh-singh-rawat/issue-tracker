import { apiSlice } from "../../app/api.config.js";

const issueListApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getIssues: build.query({
      query: ({
        projectId = "",
        page = 0,
        pageSize = 10,
        sortBy = "issues.creation_date:desc",
        reporterId,
      }) => {
        return `/issues?projectId=${projectId}&page=${page}&limit=${pageSize}&sort_by=${sortBy}&reporterId=${reporterId}`;
      },
      providesTags: ["IssueList"],
    }),
  }),
});

export const { useGetIssuesQuery } = issueListApiSlice;
