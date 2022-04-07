import { Router, Request, Response } from 'express';
import * as handlers from '../../handlers/products';

const routes = Router();

routes.get('/', handlers.index);
routes.post('/', handlers.create);

export default routes;