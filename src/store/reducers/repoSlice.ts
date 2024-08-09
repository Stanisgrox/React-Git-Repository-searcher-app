import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRepos } from "../types/typings";

interface ReposState {
    repos: IRepos[],
    isLoading: boolean,
    error: string,
    welcome: boolean,
    reposLoaded: boolean
}

const initialState: ReposState = {
    isLoading: false,
    welcome: true,
    error: '',
    repos: [],
    reposLoaded: false
};

export const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        repoFetchingInProgress(state) {
            state.isLoading = true;
            state.error = '';
            state.welcome = false;
            state.reposLoaded = false;
        },
        repoFetchigComplete(state, action: PayloadAction<IRepos[]>) {
            state.isLoading = false;
            state.error = '';
            state.repos = action.payload;
            state.reposLoaded = true;
        },
        repoFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default repoSlice.reducer;