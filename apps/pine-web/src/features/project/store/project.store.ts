import { create } from "zustand";

export type CurrentProject = {
  id: string;
  name: string;
  spaceId?: string;
};

interface ProjectState {
  currentProject: CurrentProject | null;
  setCurrentProject: (project: CurrentProject | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),
}));
