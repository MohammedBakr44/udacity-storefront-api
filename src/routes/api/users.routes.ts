import { Router, Request, Response } from 'express';
import * as handlers from '../../handlers/users';
import { validateToken } from '../../middleware/auth';

const routes = Router();

routes.route('/')
    .get(validateToken, handlers.index)
    .post(validateToken, handlers.create)
    .patch(validateToken, handlers.updateUser);
routes.route('/:id')
    .get(validateToken, handlers.getUser)
    .delete(validateToken, handlers.deleteUser);

routes.route('/auth').post(handlers.authenticate);

export default routes;