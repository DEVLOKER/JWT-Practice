import express from "express";
import { protectedResource } from "#controllers/protectedResourceController.js";
import { authMiddleware } from "#middleware/authMiddleware.js";

const protectedRouter = express.Router();

protectedRouter.get("/", authMiddleware, protectedResource);

export default protectedRouter;
