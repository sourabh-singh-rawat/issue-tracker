import type { Workspace } from "@/db";

export type WorkspaceNode = Workspace & {
  children: WorkspaceNode[];
};

const compareByName = (left: WorkspaceNode, right: WorkspaceNode) =>
  left.name.localeCompare(right.name);

export const buildWorkspaceForest = (workspaces: Workspace[]): WorkspaceNode[] => {
  const nodes = new Map<string, WorkspaceNode>();

  for (const workspace of workspaces) {
    nodes.set(workspace.id, {
      ...workspace,
      children: [],
    });
  }

  const roots: WorkspaceNode[] = [];

  for (const node of nodes.values()) {
    const parentId = node.parentWorkspaceId;
    if (parentId) {
      const parent = nodes.get(parentId);
      if (parent) {
        parent.children.push(node);
        continue;
      }
    }
    roots.push(node);
  }

  const sortTree = (list: WorkspaceNode[]) => {
    list.sort(compareByName);
    for (const node of list) {
      sortTree(node.children);
    }
  };

  sortTree(roots);
  return roots;
};
