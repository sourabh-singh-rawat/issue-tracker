export type PineAppId = "issues";

export type PineAppPath = "/home";

export type PineApp = {
  id: PineAppId;
  label: string;
  to: PineAppPath;
  isActive: (pathname: string) => boolean;
};

export const PINE_APPS: readonly PineApp[] = [
  {
    id: "issues",
    label: "Issue Tracker",
    to: "/home",
    isActive: (pathname) =>
      pathname === "/home" || pathname.startsWith("/i/") || pathname.startsWith("/v/"),
  },
];

export const getActiveApp = (pathname: string): PineApp | undefined =>
  PINE_APPS.find((app) => app.isActive(pathname));

export const appShowsSidebar = (app: PineApp | undefined): boolean => app?.id === "issues";
