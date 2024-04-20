import express from "express";
import {
    authMiddleware,
    refreshTokenMiddleware,
} from "#middleware/authMiddleware.js";
import {
    login,
    logout,
    refreshAccessToken,
} from "#controllers/authController.js";
import { requestLimitMiddleware } from "#middleware/requestLimitMiddleware.js";

const authRouter = express.Router();
const loginLimiterMiddleware = requestLimitMiddleware();
const refreshTokenLimiterMiddleware = requestLimitMiddleware();

authRouter.post("/login", loginLimiterMiddleware, login);

authRouter.post("/logout", authMiddleware, logout);

authRouter.post(
    "/refresh-access-token",
    refreshTokenLimiterMiddleware,
    refreshTokenMiddleware,
    refreshAccessToken
);

export default authRouter;
