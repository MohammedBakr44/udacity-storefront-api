import { Router, Request, Response } from 'express';
import * as handlers from '../../handlers/orders';
import { validateToken } from '../../middleware/auth';

const routes = Router();

routes.route('/')
    .post(validateToken, handlers.create)
    .get(validateToken, handlers.getOrderProducts);
routes.route('/:id')
    .get(handlers.show);
routes.route('/products').post(validateToken, handlers.createProduct)
export default routes;