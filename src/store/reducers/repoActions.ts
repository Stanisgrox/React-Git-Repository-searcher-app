import axios from "axios";
import { AppDispatch } from "../store";
import { GET_REPOS_QUERY } from "../../utils/search";
import { IGraphQLAnswer } from "../types/typings";
import { repoSlice } from "./repoSlice";

export const fetchRepos = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(repoSlice.actions.repoFetchingInProgress());
        const endpoint = "https://api.github.com/graphql";
        axios.defaults.headers.common = {'Authorization': `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`}
        const graphqlQuery = GET_REPOS_QUERY("Rust", "commiter-date-asc", 10, "");
        console.log(graphqlQuery)
        const response = await axios.post<IGraphQLAnswer>(endpoint, JSON.parse(`{"query": "${graphqlQuery}"}`));
        dispatch(repoSlice.actions.repoFetchigComplete(response.data.data.search.nodes));
    } catch (e) {
       dispatch(repoSlice.actions.repoFetchingError("Error fetching data"))
    }
}