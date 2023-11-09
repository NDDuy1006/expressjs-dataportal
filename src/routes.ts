import { Express, Request, Response } from "express";
import express from 'express';
import { getUsers, userRegister } from "./controllers/userController";
import logger from "./utils/logger";

function routes(app: Express) {
  app.use(express.json());
  app.get('/users', async (req: Request, res: Response) => {
    const users = await getUsers();
    logger.info(res.json(users))
  })

  app.post('/register', async (req: Request, res: Response) => {
    const accessToken = await userRegister(req, res);
    return accessToken
  });
};

export default routes;