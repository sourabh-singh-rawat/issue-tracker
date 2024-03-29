import React from "react";
import { useTheme } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiKeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Props {
  items: {
    text: string;
    onClick: () => void;
  }[];
  isLoading: boolean;
}

export default function Breadcrumbs({ items, isLoading }: Props) {
  const theme = useTheme();

  return (
    <MuiBreadcrumbs
      separator={<MuiKeyboardArrowRightIcon />}
      sx={{ "& .MuiTypography-root": { color: theme.palette.text.secondary } }}
    >
      {items.map(({ text, onClick }) => (
        <span key={text}>
          {isLoading ? (
            <MuiSkeleton height="20px" variant="text" width="75px" />
          ) : (
            <MuiLink
              sx={{ cursor: "pointer", color: theme.palette.grey[700] }}
              underline="hover"
              onClick={onClick}
            >
              <MuiTypography
                sx={{
                  fontWeight: 500,
                  ":hover": { color: "text.main" },
                }}
                variant="body2"
              >
                {text}
              </MuiTypography>
            </MuiLink>
          )}
        </span>
      ))}
    </MuiBreadcrumbs>
  );
}
