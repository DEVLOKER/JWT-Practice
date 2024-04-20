import { Request, Response, NextFunction } from "express";
import { AppError } from "#middleware/errorMiddleware.js";
import { HttpStatusCode } from "#types/api.js";

export const notFoundPathMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const url = req.url || req.path;
    throw new AppError(
        `Page ${url} not found on the server`,
        HttpStatusCode.NOT_FOUND
    );
};
