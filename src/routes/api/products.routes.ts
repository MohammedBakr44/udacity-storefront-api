import { Router, Request, Response } from 'express';
import * as handlers from '../../handlers/products';


const routes = Router();
routes.route('/')
    .get(handlers.index)
    .post(handlers.create)
    .patch(handlers.updateProduct);
routes.route('/:id')
    .get(handlers.getProduct)
    .delete(handlers.deleteProduct);

export default routes;