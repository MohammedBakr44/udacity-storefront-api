import { Router } from 'express';
import productsRoutes from './api/products.routes';
import UsersRoutes from './api/users.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', UsersRoutes);

export default routes;