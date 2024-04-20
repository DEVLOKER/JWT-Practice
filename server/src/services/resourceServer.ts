import express, { Application } from "express";
import protectedResourceRouter from "#routers/protectedResourceRouter.js";
import { authMiddleware } from "#middleware/authMiddleware.js";
import { logMiddleware } from "#middleware/logMiddleware.js";
import { errorMiddleware } from "#middleware/errorMiddleware.js";
import { notFoundPathMiddleware } from "#middleware/notFoundPathMiddleware.js";
import WebServer from "#services/WebServer.js";

class ResourceServer extends WebServer {
    constructor(port: number, name: string) {
        super(port, name);
        this.init();
    }

    protected init = () => {
        // use routes
        this.app.use(
            "/api-v1/protected-resource",
            logMiddleware,
            authMiddleware,
            protectedResourceRouter,
            notFoundPathMiddleware,
            errorMiddleware
        );
    };
}

export default ResourceServer;
