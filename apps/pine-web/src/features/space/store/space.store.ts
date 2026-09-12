import { create } from "zustand";

export type CurrentSpace = {
  id: string;
  name: string;
  workspaceId: string;
};

interface SpaceState {
  currentSpace: CurrentSpace | null;
  setCurrentSpace: (space: CurrentSpace | null) => void;
}

export const useSpaceStore = create<SpaceState>((set) => ({
  currentSpace: null,
  setCurrentSpace: (space) => set({ currentSpace: space }),
}));
