import { attachControllers } from "@decorators/express";
import express from 'express';
import { UsersController, GalleryController } from "../controllers";

export const publicRouter = express.Router();

attachControllers(publicRouter, [UsersController, GalleryController]);
