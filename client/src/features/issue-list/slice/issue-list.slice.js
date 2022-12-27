import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
  filters: {},
  isLoading: true,
};

const issueListSlice = createSlice({
  name: "issueList",
  initialState,
  reducers: {
    setIssueList: (state, action) => {
      state.rows = action.payload.rows;
      state.rowCount = action.payload.rowCount;

      return state;
    },
    updateIssueList: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetIssueList: (state) => {
      state = initialState;

      return state;
    },
  },
});

export const { setIssueList, updateIssueList, resetIssueList } =
  issueListSlice.actions;
export default issueListSlice.reducer;