import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET } = process.env;

export const validateToken = (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.get('Authorization');
        if (header) {
            const bearer = header.split(' ')[0].toLowerCase();
            const token = header.split(' ')[1];
            if (bearer === 'bearer' && token) {
                const decode = jwt.verify(token, TOKEN_SECRET as string);
                if (decode) {
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
}