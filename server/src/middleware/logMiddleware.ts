import { NextFunction, Request, Response } from "express";

export const logMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const method = req.method;
    const url = req.url || req.path;
    const ip =
        req.socket.remoteAddress ||
        req.ip ||
        req.headers["x-forwarded-for"] ||
        req.headers["x-real-ip"]; // req.headers.origin
    console.log(`${method} \t ${url} \t ${ip}`);

    next();
};
