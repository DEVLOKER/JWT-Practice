import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { readCookie } from "#utils/cookieUtils.js";
import config from "#config/config.js";

// #################################################################
//  access token
// #################################################################

export const generateAccessToken = (payload: object) => {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "5m",
    });
    return accessToken;
};

export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (error) {
        return undefined;
    }
};

export function isExpiredAccessToken(token: string): boolean {
    try {
        const decodedToken = jwt.verify(
            token,
            config.JWT_ACCESS_TOKEN_SECRET
        ) as JwtPayload;
        if (decodedToken.expires > new Date().getTime()) return true;
        return false;
    } catch (err) {
        return true;
    }
}

export const extractAccessToken = (req: Request) => {
    let accessToken = req.header("x-auth-token");
    if (accessToken) return accessToken;

    const header: string | undefined = req.header("Authorization") ?? undefined;
    if (!header?.startsWith("Bearer ")) return accessToken;

    accessToken = header.replace("Bearer ", "");
    if (accessToken) return accessToken;
    return accessToken;
};

export const parseAccessTokenInfo = (token: string) => {
    try {
        return verifyAccessToken(token) as JwtPayload;
    } catch (e) {
        return {};
    }
};

// #################################################################
//  refresh token
// #################################################################

export const generateRefreshToken = (payload: object) => {
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
    return refreshToken;
};

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, config.JWT_REFRESH_TOKEN_SECRET) as JwtPayload;
    } catch (error) {
        return undefined;
    }
};

export function isExpiredRefreshToken(token: string): boolean {
    try {
        const decodedToken = jwt.verify(
            token,
            config.JWT_REFRESH_TOKEN_SECRET
        ) as JwtPayload;
        if (decodedToken.expires > new Date().getTime()) return true;
        return false;
    } catch (err) {
        return true;
    }
}

export const extractRefreshToken = (req: Request) => {
    const refreshToken = readCookie(req);
    if (refreshToken) return refreshToken;
    return refreshToken;
};

export const parseRefreshTokenInfo = (token: string) => {
    try {
        return verifyRefreshToken(token) as JwtPayload;
    } catch (e) {
        return {};
    }
};
