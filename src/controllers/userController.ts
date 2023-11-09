import { PrismaClient } from '@prisma/client';
import { UserAuthPayload } from '../dtos/user.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import logger from "../utils/logger";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const prisma = new PrismaClient();

dotenv.config();

export const getUsers = async () => {
  return await prisma.user.findMany();
}

export const userRegister = async (req: Request, res: Response) => {
  let secretKey;
  try {
    const { firstName, lastName, email, password } = req.body;
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!SECRET_KEY) {
      throw new Error('SECRET_KEY is not defined');
    }
    secretKey = SECRET_KEY;
    const accessToken = jwt.sign(
      { email },
      secretKey,
      {
        expiresIn: 36000,
      },
    )

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword
      }
    });

    res.send({ accessToken })
  } catch (error) {
    logger.error(error)
  }
}