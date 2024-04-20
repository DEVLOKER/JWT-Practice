import { Middleware } from "@reduxjs/toolkit";

const logMiddleware: Middleware = (store) => (next) => (action) => {
    console.log("dispatching", action);
    return next(action);
};

export default logMiddleware;
