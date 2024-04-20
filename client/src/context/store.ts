import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "./slice/authSlice";
import logMiddleware from "@/context/middleware/logMiddleware";
import { authApi } from "@/api/authApi";
import errorHandlingMiddleware from "@/context/middleware/errorHandlingMiddleware";
import { notificationsSlice } from "@/context/slice/notificationsSlice";
import { userApi } from "@/api/userApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [notificationsSlice.reducerPath]: notificationsSlice.reducer,
    [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) =>
        defaultMiddleware()
            .concat(logMiddleware)
            .concat(authApi.middleware)
            .concat(userApi.middleware)
            .concat(errorHandlingMiddleware),
    devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
