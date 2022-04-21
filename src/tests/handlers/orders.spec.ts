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
    password: 'adventureTime12'
}

const productStore = new Products();
const product: Product = {
    name: 'Grass Sword',
    price: 50
}

let token = '';
export function OrdersSpecHandlers() {

    describe('Orders Endpoints', () => {
        beforeAll(async () => {
            const testUser = await userStore.addUser(user);
            const testProduct = await productStore.addProduct(product);
            if (testProduct.id) product.id = testProduct.id;
            const authUser = await request.post('/api/users/auth').send({
                id: testUser.id,
                password: user.password,
            })
            token = authUser.body.data.token;
            if (testUser.id) order.user_id = testUser.id;
            const testOrder = await store.addOrder(order);
            if (testOrder.id) order.id = testOrder.id;
        })
        it('Gets an order', async () => {
            const testOrder = await store.addOrder(order);
            const response = await request.get(`/api/orders/${testOrder.id}`);
            expect(response.status).toEqual(200);
        })
        it('Gets an order error', async () => {
            const response = await request.get('/api/orders/1');
            expect(response.status).toEqual(401);
        })



        it('Gets orders without authentication', async () => {
            const response = await request.get('/api/orders/');
            expect(response.status).toEqual(401);
        })

        it('Adds an order', async () => {
            const response = await request.post('/api/orders').send({
                status: order.status,
                user_id: order.user_id
            }).set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        })

        it('Adds an order with wrong id', async () => {
            const response = await request.post('/api/orders').send({
                status: order.status,
                user_id: 1
            }).set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(400);
        })

        it('Adds an order without authentication', async () => {
            const response = await request.post('/api/orders').send({
                status: order.status,
                user_id: '1'
            }).set('content-type', 'application/json')
                .set('Authorization', `Bearer `);
            expect(response.status).toEqual(401);
        })

        it('Gets order products with authentication', async () => {
            const response = await request.get('/api/orders/')
                .set('content-type', 'application/json')
                .set(`Authorization`, `Bearer ${token}`);
            expect(response.status).toEqual(200);
        })

        it('Gets order products without authentication', async () => {
            const response = await request.get('/api/orders/')
                .set('content-type', 'application/json')
                .set(`Authorization`, `Bearer `);
            expect(response.status).toEqual(401);
        })

        it('Creates a product in order with authentication', async () => {
            const response = await request.post('/api/orders/products').send({
                order_id: order.id,
                product_id: product.id,
                product_quantity: 1
            }).set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(200);
        })

    })
}
