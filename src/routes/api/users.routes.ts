import { Router, Request, Response } from 'express';
import * as handlers from '../../handlers/users';

const routes = Router();

routes.route('/')
    .get(handlers.index)
    .post(handlers.create)
    .patch(handlers.updateUser);
routes.route('/:id')
    .get(handlers.getUser)
    .delete(handlers.deleteUser);

export default routes;