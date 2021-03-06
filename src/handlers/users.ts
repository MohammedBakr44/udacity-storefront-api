import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Users } from '../models/users';

dotenv.config();

const store = new Users();

export const index = async (_request: Request, response: Response) => {
  try {
    const users = await store.index();

    response.status(200).json({
      status: '200 OK',
      data: users
    });
  } catch (error) {
    response.status(500);
  }
};

export const create = async (request: Request, response: Response) => {
  try {
    const user = await store.addUser(request.body);
    response.status(200).json({
      status: '200 OK',
      data: { ...user }
    });
  } catch (error) {
    response.status(500).send("Couldn't add user");
  }
};

export const getUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = await store.getUser(request.params.id);
    response.status(200).json({
      status: '200 OK',
      data: user
    });
  } catch (error) {
    response.status(400);
    next();
  }
};

export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = await store.updateUser(request.body);
    response.status(200).json({
      status: '200 OK',
      data: user
    });
  } catch (error) {
    response.status(400);
    next();
  }
};

export const deleteUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = await store.deleteUser(request.params.id);
    response.status(200).json({
      status: '200 OK',
      data: user
    });
  } catch (error) {
    response.status(400);
    next();
  }
};

export const authenticate = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id, password } = request.body;
    const user = await store.auth(id, password);
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
    if (!user) {
      return response.status(401).json({
        status: '401 access denied'
      });
    }
    return response.status(200).json({
      status: '200 OK',
      data: { ...user, token }
    });
  } catch (error) {
    response.status(401);
    next();
  }
};
