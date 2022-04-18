import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User, Users } from '../models/users';

dotenv.config();

const store = new Users();
const { TOKEN_SECRET } = process.env;

export const validateToken = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const header = request.get('Authorization');
    if (header) {
      const bearer = header.split(' ')[0].toLowerCase();
      const token = header.split(' ')[1];
      if (bearer === 'bearer' && token) {
        const decoded = jwt.verify(token, TOKEN_SECRET as string);
        const { id, firstName, lastName } = { user: (<any>decoded).user }.user as User;
        const user = await store.getUser(id as string);
        if (user.id === id && user.firstName === firstName && user.lastName === lastName) {
          next();
        } else {
          response.status(401).send(`Failed to authenticate user`);
        }
      } else {
        response.status(401).send('Cannont login');
      }
    } else {
      response.status(401).send(`Cannot login`);
    }
  } catch (error) {
    response.status(401).send(`Cannot login ${(error as Error).message}`);
    next(error);
  }
};
