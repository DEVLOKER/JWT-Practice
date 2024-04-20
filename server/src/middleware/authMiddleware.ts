import { NextFunction, Request, Response } from "express";
import {
    verifyAccessToken,
    isExpiredAccessToken,
    extractAccessToken,
    extractRefreshToken,
    isExpiredRefreshToken,
    verifyRefreshToken,
} from "#utils/tokenUtils.js";
import { AppError } from "#middleware/errorMiddleware.js";
import { HttpStatusCode } from "#types/api.js";

export const refreshTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const refreshToken = extractRefreshToken(req);
        if (!refreshToken)
            throw new AppError(
                `No refresh token, authorization denied`,
                HttpStatusCode.FORBIDDEN
            );

        if (isExpiredRefreshToken(refreshToken))
            throw new AppError(
                `Expired refresh token!`,
                HttpStatusCode.UNAUTHORIZED
            );

        const decodedRefreshToken = verifyRefreshToken(refreshToken);
        if (!decodedRefreshToken)
            throw new AppError(
                `Refresh token verification field!`,
                HttpStatusCode.FORBIDDEN
            );

        // shared variable between middlewares
        res.locals = {
            ...res.locals,
            refreshToken,
            decodedRefreshToken,
        };
        next();
    } catch (error) {
        next(error as Error);
    }
};

export const accessTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = extractAccessToken(req);
        if (!accessToken)
            throw new AppError(
                `No access token, authorization denied`,
                HttpStatusCode.FORBIDDEN
            );

        if (isExpiredAccessToken(accessToken))
            throw new AppError(
                `Expired access token!`,
                HttpStatusCode.UNAUTHORIZED
            );

        const decodedAccessToken = verifyAccessToken(accessToken);
        if (!decodedAccessToken)
            throw new AppError(
                `Access token verification field!`,
                HttpStatusCode.FORBIDDEN
            );

        // shared variable between middlewares
        res.locals = {
            ...res.locals,
            accessToken,
            decodedAccessToken,
        };
        next();
    } catch (error) {
        next(error as Error);
    }
};

export const authMiddleware = [
    refreshTokenMiddleware,
    accessTokenMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // shared variable between middlewares
            const {
                accessToken,
                decodedAccessToken,
                refreshToken,
                decodedRefreshToken,
            } = res.locals;

            const idAccessToken = decodedAccessToken?.id;
            const idRefreshToken = decodedRefreshToken?.id;
            if (
                !idAccessToken ||
                !idRefreshToken ||
                idAccessToken != idRefreshToken
            )
                throw new AppError(
                    "redirect to / due of security issues [idAccessToken <> idRefreshToken]",
                    HttpStatusCode.UNAUTHORIZED
                );

            next();
        } catch (error) {
            next(error);
        }
    },
];
