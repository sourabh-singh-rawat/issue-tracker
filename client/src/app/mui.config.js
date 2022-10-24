import { createTheme } from "@mui/material";

const themeConfig = {
  palette: {
    primary: {
      main: "#635DFF",
      dark: "#030066",
    },
    secondary: {
      main: "#333333",
    },
    text: {
      primary: "#080F0F",
      secondary: "#70757A",
      disabled: "#080F0F",
    },
    warning: {
      main: "#FF6700",
      dark: "#F56200",
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
    },
    action: {
      hover: "#EBEBEB",
    },
  },
  typography: {
    fontFamily: ["Inter"].join(","),
    h4: { fontSize: 30 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
  },
};

export const theme = createTheme(themeConfig);
