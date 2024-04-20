import { NextFunction, Request, Response } from "express";
import rateLimit, { Options } from "express-rate-limit";
import { AppError } from "#middleware/errorMiddleware.js";
import { HttpStatusCode } from "#types/api.js";

export const requestLimitMiddleware = ({
    limit = 5,
    windowMs: delay = 60,
    message:
        msg = "Too many request attempts from this IP, please try again after a 60 second pause",
}: Partial<Options> = {}) => {
    return rateLimit({
        limit, // Limit each IP to 5 login requests per `window` per minute
        windowMs: delay * 1000, // How long we should remember the requests : 1 minute
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        message: msg,
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        handler: (req: Request, res: Response, next: NextFunction, options) => {
            throw new AppError(
                `${options.message}\t${req.method}\t${req.url}`,
                HttpStatusCode.FORBIDDEN
            );
        },
    });
};
