import { Routes, Route } from "react-router-dom";

import "./App.css";

import Dashboard from "./routes/dashboard/dashboard.component";
import SignIn from "./routes/signin/signin.component";
import SignUp from "./routes/signup/signup.component";
import Projects from "./routes/projects/projects.component";
import Teams from "./routes/teams/teams.component";
import Issues from "./routes/issues/issues.component";
import Sidebar from "./components/sidebar/sidebar.component";
import ProjectIssues from "./components/project-issues/project-issues.component";
import ProjectMembers from "./components/project-members/project-members.component";

const NoComponent = () => {
    return <h1>404</h1>;
};

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Sidebar />}>
                <Route index element={<Dashboard />}></Route>
                <Route path="/projects" element={<Projects />}></Route>
                <Route
                    path="/projects/:projectId/issues"
                    element={<ProjectIssues />}
                ></Route>
                <Route
                    path="/projects/:projectId/members"
                    element={<ProjectMembers />}
                ></Route>
                <Route path="/teams" element={<Teams />}></Route>
                <Route path="/issues/*" element={<Issues />}></Route>
            </Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="*" element={<NoComponent />}></Route>
        </Routes>
    );
};

export default App;
