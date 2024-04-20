import { hideMessage } from "@/context/slice/notificationsSlice";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { useEffect, useRef } from "react";

export const useNotification = () => {
    const notification = useAppSelector(
        (store) => store.notification.notification
    );
    const dispatch = useAppDispatch();

    const { type, message, hideAfterDelay } = notification ?? {
        type: null,
        message: null,
        hideAfterDelay: null,
    };

    const timerOut = useRef<number | null>(null);

    useEffect(() => {
        if (hideAfterDelay)
            timerOut.current = window.setTimeout(() => {
                dispatch(hideMessage());
            }, hideAfterDelay);
        return () => {
            timerOut.current && clearTimeout(timerOut.current);
        };
    }, [type, message, hideAfterDelay, dispatch]);

    const closeNotification = () => {
        dispatch(hideMessage());
        timerOut.current && clearTimeout(timerOut.current);
    };

    return {
        notification: { type, message, hideAfterDelay },
        closeNotification,
    };
};
