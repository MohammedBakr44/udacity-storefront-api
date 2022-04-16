import { Router } from 'express';
import productsRoutes from './api/products.routes';
import UsersRoutes from './api/users.routes';
import OrdersRoutes from './api/orders.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', UsersRoutes);
routes.use('/orders', OrdersRoutes);

export default routes;