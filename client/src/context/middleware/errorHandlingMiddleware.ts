import { showMessage } from "@/context/slice/notificationsSlice";
import { Middleware } from "redux";

const errorHandlingMiddleware: Middleware = (store) => (next) => (action) => {
    const { error, payload } = action;
    if (error && payload?.status) {
        const { error, originalStatus, data, status } = payload;

        const message = `[${status}] ${
            error ? error : data ? data.message : "An error occurred"
        }`;
        console.log(message);
        // Dispatch an action to set the error message in notification slice
        store.dispatch(showMessage({ type: "error", message: message }));
    }

    return next(action);
};

export default errorHandlingMiddleware;
