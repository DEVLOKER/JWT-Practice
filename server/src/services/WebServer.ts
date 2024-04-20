import express, { Application } from "express";
import authRouter from "#routers/authRouter.js";
import { logMiddleware } from "#middleware/logMiddleware.js";
import { notFoundPathMiddleware } from "#middleware/notFoundPathMiddleware.js";
import { errorMiddleware } from "#middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import http from "http";

class WebServer {
    protected name: string;
    protected port: number;
    protected app!: Application; // Using definite assignment assertion
    protected httpServer!: http.Server; // Using definite assignment assertion

    constructor(port: number, name: string) {
        this.port = port;
        this.name = name;
        this.init();
    }

    protected init = () => {
        this.app = express();
        // use middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
    };

    public start = () => {
        this.httpServer = this.app.listen(this.port, () => {
            console.log(`${this.name} listening on port ${this.port}`);
        });
    };

    public stop = () => {
        this.httpServer.close();
    };
}

export default WebServer;
