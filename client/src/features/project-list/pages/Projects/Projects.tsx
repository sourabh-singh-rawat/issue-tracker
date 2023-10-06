import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import SectionHeader from "../../../../common/components/SectionHeader";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

function Projects() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MuiGrid gap="40px" container>
      {pathname === "/projects" && (
        <MuiGrid xs={12} item>
          <SectionHeader
            noButton={false}
            actionButton={
              <PrimaryButton
                type="button"
                label="Create Project"
                onClick={() => navigate("/projects/new")}
              />
            }
            title="Projects"
          />
        </MuiGrid>
      )}
      <MuiGrid xs={12} item>
        <Outlet />
      </MuiGrid>
    </MuiGrid>
  );
}

export default Projects;
