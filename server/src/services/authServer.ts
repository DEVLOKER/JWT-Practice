import authRouter from "#routers/authRouter.js";
import { logMiddleware } from "#middleware/logMiddleware.js";
import { notFoundPathMiddleware } from "#middleware/notFoundPathMiddleware.js";
import { errorMiddleware } from "#middleware/errorMiddleware.js";
import WebServer from "#services/WebServer.js";

class AuthServer extends WebServer {
    constructor(port: number, name: string) {
        super(port, name);
        this.init();
    }

    protected init = () => {
        // use routes
        this.app.use(
            "/api-v1/auth",
            logMiddleware,
            authRouter,
            notFoundPathMiddleware,
            errorMiddleware
        );
    };
}

export default AuthServer;
