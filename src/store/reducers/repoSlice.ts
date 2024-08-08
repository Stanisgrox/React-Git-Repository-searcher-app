import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: ''
};

export const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        repoFetchingInProgress(state) {
            state.isLoading = true;
        },
        repoFetchigComplete(state) {
            state.isLoading = false;
            state.error = ''
        },
        repoFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        }
    }
});