/* eslint-disable import/prefer-default-export */
import apiSlice from '../../config/api.config';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
