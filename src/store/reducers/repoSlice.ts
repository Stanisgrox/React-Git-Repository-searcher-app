import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReposState {
    isLoading: boolean,
    error: string,
    welcome: boolean,
    reposLoaded: boolean,
    searchTerm: string | undefined,
    pageAmount: number,
    after: string | undefined,
    before: string | undefined,
    first: number | undefined,
    last: number | undefined,
    sorting: string,
    scrolled: number,
    previewID: string
}

const initialState: ReposState = {
    isLoading: false,
    welcome: true,
    error: '',
    reposLoaded: false,
    searchTerm: undefined,
    pageAmount: 10,
    after: undefined,
    before: undefined,
    first: 10,
    last: undefined,
    sorting: '',
    scrolled: 0,
    previewID: ''
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
        repoSetSearchTerm(state, action: PayloadAction<string | undefined>) {
            state.searchTerm = action.payload;
            state.sorting = '';
            state.scrolled = 0;
        },
        repoSetPageAmount(state, action: PayloadAction<number>) {
            state.pageAmount = action.payload;
            if (state.first) state.first = Number(action.payload);
            else state.last = Number(action.payload);
            state.scrolled = 0;
            state.after = undefined
            state.before = undefined
        },
        repoSetNextPageMarker(state, action: PayloadAction<string | undefined>) {
            state.after = action.payload;
            state.before = undefined;
            state.first = state.pageAmount;
            state.last = undefined
        },
        repoSetPreviousPageMarker(state, action: PayloadAction<string | undefined>) {
            state.before = action.payload;
            state.after = undefined;
            state.first = undefined;
            state.last = state.pageAmount
        },
        repoSetSorting(state, action: PayloadAction<string>) {
            state.sorting = action.payload;
            state.scrolled = 0;
        },
        repoSetScrolled(state, action: PayloadAction<number>) {
            state.scrolled = action.payload;
        },
        infoSetID(state, action: PayloadAction<string>) {
            state.previewID = action.payload;
        }
    }
});

export default repoSlice.reducer;