import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRepos } from "../types/typings";

interface ReposState {
    repos: IRepos[],
    isLoading: boolean,
    error: string,
    welcome: boolean
}

const initialState: ReposState = {
    isLoading: false,
    welcome: true,
    error: '',
    repos: []
};

export const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        repoFetchingInProgress(state) {
            state.isLoading = true;
            state.error = '';
            state.welcome = false;
        },
        repoFetchigComplete(state, action: PayloadAction<IRepos[]>) {
            state.isLoading = false;
            state.error = '';
            state.repos = action.payload;
        },
        repoFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default repoSlice.reducer;