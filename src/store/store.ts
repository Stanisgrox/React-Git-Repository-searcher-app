import { combineReducers, configureStore } from "@reduxjs/toolkit";
import repoReducer from './reducers/repoSlice';

const rootReducer = combineReducers({
    repoReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type ApplicationStore = ReturnType<typeof setupStore>;
export type AppDispatch = ApplicationStore['dispatch'];