import React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

interface AvatarProps {
  width?: string | number;
  height?: string | number;
  variant?: "circular" | "rounded" | "square";
  label?: string;
  photoUrl?: string;
  color?: string;
}

export default function Avatar({
  variant,
  label,
  photoUrl,
  width = 22,
  height = 22,
}: AvatarProps) {
  const theme = useTheme();

  return (
    <MuiAvatar
      src={photoUrl}
      variant={variant}
      sx={{
        width,
        height,
        fontSize: theme.typography.body1,
        fontWeight: theme.typography.fontWeightBold,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <MuiTypography fontWeight="600" textAlign="center">
        {label && label[0]}
      </MuiTypography>
    </MuiAvatar>
  );
}
