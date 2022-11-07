import { useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { enIN } from "date-fns/esm/locale";

import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import Title from "../Title/Title";
import Breadcrumbs from "../Breadcrumbs";

const TitleSection = ({
  page,
  loading,
  updateTitle,
  updateTitleQuery,
  breadcrumbItems,
  statusSelector,
  prioritySelector,
}) => {
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const theme = useTheme();

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        <Breadcrumbs items={breadcrumbItems} loading={loading} />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Title
          page={page}
          loading={loading}
          updateTitle={updateTitle}
          updateTitleQuery={updateTitleQuery}
        />
      </MuiGrid>
      <MuiGrid item xs={12} sx={{ color: theme.palette.grey[700] }}>
        <MuiBreadcrumbs separator="•">
          {loading ? <Skeleton width="80px" /> : statusSelector}
          {loading ? <Skeleton width="80px" /> : prioritySelector}
          {loading ? (
            <Skeleton width="80px" />
          ) : (
            <MuiTypography variant="body2" component="span" fontWeight={600}>
              {type[0].toUpperCase()}
              {type.slice(1, -1)}
            </MuiTypography>
          )}
          {loading ? (
            <Skeleton width="80px" />
          ) : (
            <MuiTypography variant="body2" component="span" fontWeight={600}>
              {" "}
              {page.creation_date &&
                format(parseISO(page.creation_date), "PP", {
                  locale: enIN,
                })}
            </MuiTypography>
          )}
        </MuiBreadcrumbs>
      </MuiGrid>
    </MuiGrid>
  );
};

export default TitleSection;
