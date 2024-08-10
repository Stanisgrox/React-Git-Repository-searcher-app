import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReposState {
    isLoading: boolean,
    error: string,
    welcome: boolean,
    reposLoaded: boolean,
    searchTerm: string | undefined,
    pageAmount: number
}

const initialState: ReposState = {
    isLoading: false,
    welcome: true,
    error: '',
    reposLoaded: false,
    searchTerm: undefined,
    pageAmount: 10
};

export const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        repoWelcomeLeft(state) {
            state.isLoading = false;
            state.welcome = false;
            state.error = '';
            state.reposLoaded = true;
        },
        repoSetSearchTerm(state, action) {
            state.searchTerm = action.payload
        },
        repoSetPageAmount(state, action) {
            state.pageAmount = action.payload
        }
    }
});

export default repoSlice.reducer;