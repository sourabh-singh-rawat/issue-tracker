import axios from "axios";
import { useWorkspaceStore } from "../features/workspace/store";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  console.error(
    "[pine-web] VITE_API_BASE_URL is not set. API calls will target the web app origin instead of the API gateway.",
  );
}

export const httpClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
  const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
  if (!currentWorkspace) {
    return config;
  }

  const headers = config.headers;
  headers.set("X-Tenant-Id", currentWorkspace.tenantId);
  headers.set("X-Workspace-Id", currentWorkspace.id);
  return config;
});
