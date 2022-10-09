import { useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import SectionHeader from "../../../../common/SectionHeader";
import { CircularProgress } from "@mui/material";

const People = () => {
  const { pathname } = useLocation();
  const loading = useSelector((store) => store.auth.loading);

  return (
    <MuiGrid container gap="40px">
      {pathname === "/collaborators" && (
        <MuiGrid item xs={12}>
          <SectionHeader
            title="People"
            subtitle="This section contains all the collaborators that work with you."
          />
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {loading ? <CircularProgress /> : <Outlet />}
      </MuiGrid>
    </MuiGrid>
  );
};

export default People;