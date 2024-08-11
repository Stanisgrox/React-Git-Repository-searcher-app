import { api as generatedApi } from "./generated"

export const reposAPI = generatedApi.enhanceEndpoints({
  addTagTypes: ["Repos"],
  endpoints: {
    GetRepos: {
      providesTags: ["Repos"],
      transformResponse: (res: any) => {
        return res
      },
    },
  },
});

export const { useGetReposQuery, useGetInfoQuery } = reposAPI;
