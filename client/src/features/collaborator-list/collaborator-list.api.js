import apiSlice from '../../config/api.config';

const collaboratorApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCollaborators: build.query({
      query: () => '/collaborators',
    }),
  }),
});

export const { useGetCollaboratorsQuery } = collaboratorApiSlice;

export default useGetCollaboratorsQuery;