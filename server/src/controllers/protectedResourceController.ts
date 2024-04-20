import { Request, Response } from "express";
import { HttpStatusCode } from "#types/api.js";

export const protectedResource = (req: Request, res: Response) => {
    // const {
    //     accessToken,
    //     decodedAccessToken,
    //     refreshToken,
    //     decodedRefreshToken,
    // } = res.locals;

    const randomData = [];
    for (let i = 0; i < 5; i++) randomData.push(Math.floor(Math.random() * 10));

    res.locals = {};
    res.status(HttpStatusCode.OK).json({
        message: "welcome to protected resources",
        protectedData: randomData,
    });
};
