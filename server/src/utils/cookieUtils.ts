import { Request, Response } from "express";
import config from "#config/config.js";

// #################################################################
//  cookies utils
// #################################################################

export const saveCookie = (res: Response, refreshToken: string) => {
    res.cookie(config.TOKEN_KEY, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * (24 * 60 * 60) * 1, // = one day
    });
};

export const clearCookie = (res: Response) => {
    res.clearCookie(config.TOKEN_KEY, {
        maxAge: 0,
    });
};

export const readCookie = (req: Request): string | undefined => {
    try {
        return req?.cookies?.[`${config.TOKEN_KEY}`] ?? undefined;
    } catch (error) {
        return undefined;
    }
};
