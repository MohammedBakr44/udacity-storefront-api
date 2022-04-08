import { Router, Request, Response } from 'express';
import * as handlers from '../../handlers/products';
import { validateToken } from '../../middleware/auth';

const routes = Router();
routes.route('/')
    .get(handlers.index)
    .post(validateToken, handlers.create)
    .patch(validateToken, handlers.updateProduct);
routes.route('/:id')
    .get(handlers.getProduct)
    .delete(validateToken, handlers.deleteProduct);

export default routes;