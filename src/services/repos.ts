import { RTKQueryAnswer } from "../store/types/typings";
import { api as generatedApi } from "./generated"

export const reposAPI = generatedApi.enhanceEndpoints({
  addTagTypes: ["Repos"],
  endpoints: {
    GetRepos: {
      providesTags: ["Repos"],
      transformResponse: (res: RTKQueryAnswer) => {
        return res
      },
    },
  },
});

export const { useGetReposQuery } = reposAPI;
