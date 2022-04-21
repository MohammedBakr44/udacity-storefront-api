import OrdersSpecModel from './models/orders.spec';
import { OrdersSpecHandlers } from './handlers/orders.spec';
import ProductsSpecModel from './models/products.spec';
import ProductsSpecHandlers from './handlers/products.spec';
import userSpecModel from './models/users.spec';
import userSpecHandlers from './handlers/users.spec';

OrdersSpecModel();
OrdersSpecHandlers();
ProductsSpecModel();
ProductsSpecHandlers();
userSpecModel();
userSpecHandlers();