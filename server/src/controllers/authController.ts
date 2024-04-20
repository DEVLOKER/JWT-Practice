import { Request, Response, NextFunction } from "express";

import { clearCookie, saveCookie } from "#utils/cookieUtils.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "#utils/tokenUtils.js";
import { HttpStatusCode } from "#types/api.js";
import { AppError } from "#middleware/errorMiddleware.js";
import { findUser, updateUser } from "#database/fakeDataBase.js";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password } = req.body;
        const user = await findUser({ username, password });

        if (!user)
            throw new AppError(
                `Invalid username or password`,
                HttpStatusCode.BAD_REQUEST
            );
        const accessToken = generateAccessToken({ id: user.id });
        const refreshToken = generateRefreshToken({
            id: user.id,
            username: user.username,
        });

        updateUser({ id: user.id }, { accessToken, refreshToken });

        const { password: hash, ...rest } = user;
        const userWithoutPassword = { ...rest, accessToken, refreshToken };

        saveCookie(res, refreshToken);
        res.status(HttpStatusCode.OK).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { decodedAccessToken } = res.locals;
        const { id: idRequest } = req.body;
        const { id: idAccessToken } = decodedAccessToken;
        if (idRequest != idAccessToken)
            throw new AppError(
                "redirect to / due of security issues [idRequest <> idAccessToken]",
                HttpStatusCode.UNAUTHORIZED
            );

        updateUser({ id: idRequest }, { accessToken: "", refreshToken: "" });
        res.locals = {};

        clearCookie(res);
        res.status(HttpStatusCode.NO_CONTENT).json({
            message: "logout successfully!",
        });
    } catch (error) {
        next(error);
    }
};

export const refreshAccessToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // const { decodedAccessToken } = res.locals;

        const { id: idRequest } = req.body;
        // if (idRequest != idAccessToken)
        //     throw new AppError(
        //         "redirect to / due of security issues [idRequest <> idAccessToken]",
        //         HttpStatusCode.UNAUTHORIZED
        //     );

        res.locals = {};
        const newAccessToken = generateAccessToken({ id: idRequest });

        updateUser({ id: idRequest }, { accessToken: newAccessToken });

        res.status(HttpStatusCode.OK).json({ accessToken: newAccessToken });
    } catch (error) {
        next(error);
    }
};
