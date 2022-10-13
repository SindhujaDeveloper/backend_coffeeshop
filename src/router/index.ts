import { attachControllers } from "@decorators/express";
import express from 'express';
import { UsersController } from "../controllers";

export const publicRouter = express.Router();

attachControllers(publicRouter, [UsersController]);
