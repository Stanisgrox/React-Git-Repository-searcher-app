import { combineReducers, configureStore } from "@reduxjs/toolkit";
import repoReducer from './reducers/repoSlice';
import { reposAPI } from "../services/repos";

const rootReducer = combineReducers({
    repoReducer,
    [reposAPI.reducerPath]: reposAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(reposAPI.middleware)
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type ApplicationStore = ReturnType<typeof setupStore>;
export type AppDispatch = ApplicationStore['dispatch'];