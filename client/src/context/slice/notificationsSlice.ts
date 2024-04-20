import { HIDE_AFTER_DELAY } from "@/constants/notificationConstants";
import { TNotification } from "@/types/notification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TNotificationsState = {
    notification: TNotification | null;
};

const initialState: TNotificationsState = {
    notification: null,
};

export const notificationsSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showMessage: (
            state: TNotificationsState,
            action: PayloadAction<
                Pick<TNotification, "message"> &
                    Partial<Omit<TNotification, "message">>
            >
        ) => {
            const { type, message, hideAfterDelay } = action.payload;
            state.notification = {
                message,
                type: type || "info", // Default type: info
                hideAfterDelay: hideAfterDelay || HIDE_AFTER_DELAY,
            };
        },
        hideMessage: (state: TNotificationsState) => {
            state.notification = null;
        },
    },
});

export const { showMessage, hideMessage } = notificationsSlice.actions;
