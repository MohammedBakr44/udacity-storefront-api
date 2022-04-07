import { Router } from 'express';
import productsRoutes from './api/products.routes';

const routes = Router();

routes.use('/products', productsRoutes);

export default routes;