import { createApi } from "@reduxjs/toolkit/query/react";
import { TCredentials, TUser } from "@/types/user";
import { API_URL } from "@/constants/apiConstants";
import { showMessage } from "@/context/slice/notificationsSlice";
import { baseQueryWithReauth } from "@/api/api";
import { AppState } from "@/context/store";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<TUser, TCredentials>({
            query(args) {
                return {
                    url: `/${API_URL}/auth/login`,
                    method: "POST",
                    body: args, // { username, password },
                };
            },
            onQueryStarted: async (
                args,
                { dispatch, queryFulfilled, getState }
            ) => {
                const username = (getState() as AppState).auth.user?.username;
                dispatch(
                    showMessage({ type: "info", message: "Logging in ..." })
                );
                await queryFulfilled;
                dispatch(
                    showMessage({
                        type: "success",
                        message: `[${username}] login successful`,
                    })
                );
            },
        }),
        logout: builder.mutation<TUser, Pick<TUser, "id">>({
            query({ id }) {
                return {
                    url: `/${API_URL}/auth/logout`,
                    method: "POST",
                    body: { id },
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
                const username = (getState() as AppState).auth.user?.username;
                dispatch(
                    showMessage({ type: "info", message: "Logging out ..." })
                );
                await queryFulfilled;
                dispatch(
                    showMessage({
                        type: "success",
                        message: `[${username}] logout successful`,
                    })
                );
            },
        }),
        refreshAccessToken: builder.mutation<TUser, Pick<TUser, "id">>({
            query({ id }) {
                return {
                    url: `/${API_URL}/auth/refresh-access-token`,
                    method: "POST",
                    body: { id },
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
                const username = (getState() as AppState).auth.user?.username;
                dispatch(
                    showMessage({
                        type: "info",
                        message: "getting new access token ...",
                    })
                );
                await queryFulfilled;
                dispatch(
                    showMessage({
                        type: "success",
                        message: `Obtained new access token successful for "${username}"`,
                    })
                );
            },
        }),
    }),
});
