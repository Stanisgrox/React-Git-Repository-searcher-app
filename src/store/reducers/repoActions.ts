import { AppDispatch } from "../store";
import { repoSlice } from "./repoSlice";

export const searchClicked = () => async (dispatch: AppDispatch) => {;
    dispatch(repoSlice.actions.repoWelcomeLeft());
}

export const repoSetSearchTerm = (term: string) => (dispatch: AppDispatch) => {
    dispatch(repoSlice.actions.repoSetSearchTerm(term));
}

export const repoSetPageAmount = (amount: number) => (dispatch: AppDispatch) => {
    dispatch(repoSlice.actions.repoSetPageAmount(amount));
}

export const repoSetNextPageMarker = (page: string | undefined) => (dispatch: AppDispatch) => {
    if (!page) return;
    dispatch(repoSlice.actions.repoSetNextPageMarker(page));
}

export const repoSetPreviousPageMarker = (page: string | undefined) => (dispatch: AppDispatch) => {
    if (!page) return;
    dispatch(repoSlice.actions.repoSetPreviousPageMarker(page));
}