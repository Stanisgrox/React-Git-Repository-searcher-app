import { AppDispatch } from "../store";
import { repoSlice } from "./repoSlice";

/*
    Действия, которые выполняют операции в Slice. Изначально, здесь находилась логика, осуществляющая запросы, но RTKQuery
    забрал эту работу.

    Подробнее о назначении функций в repoSlice.ts
*/

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

export const repoSetSorting = (sorting: string) => (dispatch: AppDispatch) => {
    dispatch(repoSlice.actions.repoSetSorting(sorting));
}

export const repoSetScrolled = (scrolled: number) => (dispatch: AppDispatch) => {
    dispatch(repoSlice.actions.repoSetScrolled(scrolled));
}

export const infoSetID = (id: string) => (dispatch: AppDispatch) => {
    dispatch(repoSlice.actions.infoSetID(id));
}