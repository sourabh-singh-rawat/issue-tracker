import { Routes, Route } from "react-router-dom";

// Routes
import Dashboard from "./routes/dashboard/dashboard.component";
import SignIn from "./routes/signin/signin.component";
import SignUp from "./routes/signup/signup.component";
import Teams from "./routes/teams/teams.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Project from "./components/project/project.component";
import Projects from "./routes/projects/projects.component";
import ProjectMembers from "./components/project-members/project-members.component";
import Issue from "./components/issue/issue.component";
import Issues from "./routes/issues/issues.component";
import IssuesBoard from "./components/issue-board/issues-board.component";
import ProjectForm from "./components/project-form/project-form.component";
import IssueForm from "./components/issue-form/issue-form.component";
import TeamForm from "./components/team-form/team-form.component";
import IssuesDetailed from "./components/issues-detailed/issues-detailed.component";

const NoComponent = () => {
  return <h1>404</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<Dashboard />} />
        {/* list routes */}
        <Route path="projects" element={<Projects />} />
        <Route path="teams" element={<Teams />} />
        <Route path="issues" element={<Issues />}>
          <Route index element={<IssuesDetailed />} />
          <Route path=":board" element={<IssuesBoard />} />
        </Route>
        {/* project route */}
        <Route path="project">
          <Route path="create" element={<ProjectForm />} />
          <Route path=":projectId" element={<Project />}>
            <Route path="issues" element={<IssuesDetailed />} />
            <Route path="people" element={<ProjectMembers />} />
          </Route>
        </Route>
        {/* team route */}
        <Route path="team">
          <Route path="create" element={<TeamForm />} />
        </Route>
        {/* issue route */}
        <Route path="issue">
          <Route path="create" element={<IssueForm />} />
          <Route path=":issueId" element={<Issue />} />
        </Route>
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<NoComponent />} />
    </Routes>
  );
};

export default App;
