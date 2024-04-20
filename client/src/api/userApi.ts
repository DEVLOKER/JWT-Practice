import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/api/api";
import { API_URL } from "@/constants/apiConstants";

export const userApi = createApi({
    reducerPath: "users",
    tagTypes: ["users"],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        protectedInfo: builder.query({
            query: () => ({
                url: `/${API_URL}/protected-resource`,
                method: "GET",
            }),
            providesTags: [{ type: "users", id: "LIST" }],
        }),
    }),
});
