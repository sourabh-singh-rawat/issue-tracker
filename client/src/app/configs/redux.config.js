import logger from "redux-logger";
import { apiSlice } from "../../app/services/api.service";
import snackbarReducer from "../../features/snackbar.reducer";
import authSlice from "../../features/auth/auth.slice";
import collaboratorListSlice from "../../features/collaboratorList/collaboratorList.slice";
import issueSlice from "../../features/issue/issue.slice";
import issueListSlice from "../../features/issueList/issueList.slice";
import profileSlice from "../../features/profile/profile.slice";
import projectSlice from "../../features/project/project.slice";
import projectListSlice from "../../features/projectList/projectList.slice";
import teamSlice from "../../features/team/team.slice";
import teamListSlice from "../../features/teamList/teamList.slice";

const storeConfig = {
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    collaboratorList: collaboratorListSlice,
    issue: issueSlice,
    issueList: issueListSlice,
    profile: profileSlice,
    project: projectSlice,
    projectList: projectListSlice,
    team: teamSlice,
    teamList: teamListSlice,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(logger),
};

export default storeConfig;