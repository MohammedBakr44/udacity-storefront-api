import { Orders, Order } from '../../models/orders';
import { User, Users } from '../../models/users';
import { Product, Products } from '../../models/products';
import { app } from '../../server';
import supertest from 'supertest';

const store = new Orders();
const order: Order = {
    status: 'active',
    user_id: '',
    products_id: [],
    quantity: 0
}
const request = supertest(app);

const userStore = new Users();
const user: User = {
    firstname: 'BMO',
    lastname: 'MOE',
    password: 'adventureTime12',
    id: ''
}

const productStore = new Products();
const product: Product = {
    name: 'Grass Sword',
    price: 50
}

let token = '';
export default function OrdersSpecModel() {
    describe('Orders model', () => {
        it('should have a method to get all orders', () => {
            expect(store.getOrderProducts).toBeDefined();
        });

        it('should have a method to add Orders', () => {
            expect(store.addOrder).toBeDefined();
        });

        it('should have a method to get Order', () => {
            expect(store.getOrder).toBeDefined();
        });

        it('should have a method to add product to an order', () => {
            expect(store.addProductToOrder).toBeDefined();
        });
    });

    describe('Orders CRUD', () => {
        beforeAll(async () => {
            const testUser = await userStore.addUser(user);
            const testProduct = await productStore.addProduct(product);
            if (testProduct.id) product.id = testProduct.id;
            const authUser = await request.post('/api/users/auth').send({
                id: testUser.id,
                password: user.password,
            })
            token = authUser.body.data.token;
            if (testUser.id) {
                order.user_id = testUser.id;
                user.id = testUser.id;
            };
            const testOrder = await store.addOrder(order);
            if (testOrder.id) order.id = testOrder.id;
        })
        it('Should return all orders', async () => {
            const result = store.getOrderProducts();
            expect(result).toBeTruthy();
        })
        it('should add an order', async () => {
            const result = await store.addOrder(order);
            expect(result.user_id).toEqual(order.user_id);
        });
        it('should get order', async () => {
            const result = await store.getOrder(order.id as string);
            expect(result.id).toEqual(order.id);
        })
        it('should add product to an order', async () => {
            const result = await store.addProductToOrder(order.id as string, product.id as string, 1)
            expect({ order_id: order.id, product_id: product.id }).toEqual({ order_id: result.order_id, product_id: product.id });
        })
    })
}