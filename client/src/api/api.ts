import { API_URL } from "@/constants/apiConstants";
import { clearAuth, updateAccessToken } from "@/context/slice/authSlice";
import { AppState } from "@/context/store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as AppState).auth.user?.accessToken;
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // try to get a new token from refreshResult
        const { data } = await baseQuery(
            {
                url: `/${API_URL}/auth/refresh-access-token`,
                method: "POST",
                body: { id: (api.getState() as AppState).auth.user?.id },
            },
            api,
            extraOptions
        );
        const { accessToken = null } = data as { accessToken: string };
        if (accessToken) {
            // store the new token
            api.dispatch(updateAccessToken({ accessToken }));

            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearAuth());
        }
    }
    return result;
};
