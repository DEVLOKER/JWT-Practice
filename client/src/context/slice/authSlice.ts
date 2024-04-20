import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "@/types/user";
import {
    readAuthFromStorage,
    removeAuthFromStorage,
    saveAuthToStorage,
    updateAuthInStorage,
} from "@/utils/tokenUtils";

type TUserState = {
    user: TUser | null;
};
const initialState: TUserState = { user: readAuthFromStorage() };

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuth: (state: TUserState, action: PayloadAction<TUser>) => {
            const auth = action.payload;
            state.user = auth;
            saveAuthToStorage(auth);
        },
        clearAuth: (state: TUserState) => {
            state.user = null;
            removeAuthFromStorage();
        },
        updateAccessToken: (
            state: TUserState,
            action: PayloadAction<Pick<TUser, "accessToken">>
        ) => {
            const newAccessToken = action.payload.accessToken;
            if (state.user) {
                state.user = {
                    ...state.user,
                    accessToken: newAccessToken,
                };
                updateAuthInStorage(state.user);
            }
        },
    },
});

export const userReducer = authSlice.reducer;
export const { setAuth, clearAuth, updateAccessToken } = authSlice.actions;
// export default authSlice.actions;
