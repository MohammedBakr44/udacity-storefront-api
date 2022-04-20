import express, { Router, Request, Response } from 'express';
import * as handlers from '../../handlers/users';
import { validateToken } from '../../middleware/auth';

const routes = Router();

routes.route('/')
    .get(validateToken, handlers.index)
    .post(handlers.create)
    .put(validateToken, handlers.updateUser);
routes.route('/:id')
    .get(validateToken, handlers.getUser)
    .delete(validateToken, handlers.deleteUser);

routes.route('/auth').post(handlers.authenticate);

const users_route = (app: express.Application) => {
    app.get('/api/users', validateToken, handlers.index);
    app.post('/api/users', handlers.create);
    app.put('/api/users', validateToken, handlers.updateUser);
    app.get('/api/users/:id', validateToken, handlers.getUser);
    app.delete('/api/users/:id', validateToken, handlers.deleteUser);
    app.post('/api/users/auth', handlers.authenticate);
}

export default users_route;