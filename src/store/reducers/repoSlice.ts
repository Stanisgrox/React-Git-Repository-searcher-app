import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
    Локальное хранилище состояний
    Welcome - отображается ли приветственный экран. Если False, то отобразится таблица или плейсхолдер загрузки.
        При первом поиске выполняется Action "searchClicked", который вызывает редусер repoWelcomeLeft, убирая приветственный
        экран с главной страницы до конца сессии.
    searchTerm - значение строки поиска из search-bar.tsx
    pageAmount - значение из input из paginator.tsx
    after - GraphQL маячок от API GitHub, необходимый для перехода на следующую страницу (вместе с first)
    before - такой же маячок, но для перехода на предыдущую страницу (вместе с last)
    first, last - один из них равен pageAmount, другой undefined. Используются в пагинации
    sorting - строка сортировки, которая задается кликами на поля в верхушке таблицы (она соответствует параметру поиска sort:)
    scrolled - сколько элементов было пролистано. Используется для индикатора в пагинаторе
    previewID - ID репозитория, который был выбран для предпросмотра в таблице.
*/

interface ReposState {
    welcome: boolean,
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
    welcome: true,
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
            state.welcome = false;
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