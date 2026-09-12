import { List, ListItem, ListItemText, Skeleton } from "@mui/material";
import { useFindProjectsQuery } from "@generated/gql";
import { CreateProjectModal } from "../CreateProjectModal";
import { ProjectListItem } from "../ProjectListItem";

type ProjectListProps = {
  spaceId: string;
};

export const ProjectList = ({ spaceId }: ProjectListProps) => {
  const projectsQuery = useFindProjectsQuery({ spaceId });
  const projects = projectsQuery.data?.findProjects?.rows ?? [];
  const isLoading = projectsQuery.isPending;

  return (
    <List
      subheader={
        <>
          <ListItem secondaryAction={<CreateProjectModal spaceId={spaceId} />}>
            <ListItemText>Projects</ListItemText>
          </ListItem>
          {isLoading ? (
            <ListItem dense>
              <ListItemText>
                <Skeleton />
              </ListItemText>
            </ListItem>
          ) : (
            projects
              .filter(
                (
                  project,
                ): project is typeof project & {
                  id: string;
                  name: string;
                  spaceId: string;
                } =>
                  Boolean(project?.id) &&
                  Boolean(project?.name) &&
                  Boolean(project?.spaceId),
              )
              .map((project) => (
                <ProjectListItem
                  key={project.id}
                  projectId={project.id}
                  name={project.name}
                  spaceId={project.spaceId}
                />
              ))
          )}
        </>
      }
      disablePadding
    />
  );
};
