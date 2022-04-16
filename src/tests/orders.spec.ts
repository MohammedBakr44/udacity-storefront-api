import { Orders } from '../models/orders';
import { app } from '../server';
import supertest from 'supertest';
import * as dotenv from 'dotenv';

dotenv.config();

const { TEST_TOKEN } = process.env;

const store = new Orders();
const request = supertest(app);

export function OrdersSpec() {
    describe('Orders model', () => {
        it('should have a method to get all orders', () => {
            expect(store.getOrderProducts).toBeDefined();
        })

        it('should have a method to add Orders', () => {
            expect(store.addOrder).toBeDefined();
        })

        it('should have a method to get Order', () => {
            expect(store.getOrder).toBeDefined();
        })

        it('should have a method to add product to an order', () => {
            expect(store.addProductToOrder).toBeDefined();
        })
    })

    describe('Orders CRUD', () => {
        it('Gets an order', async () => {
            const response = await request.get('/api/orders/2bb9971b-3d8f-4918-a662-b7a5645b847d');
            expect(response.status).toEqual(200);
        })
        it('Gets an order error', async () => {
            const response = await request.get('/api/orders/1');
            expect(response.status).toEqual(401);
        })

        it('Gets orders with authentication', async () => {
            const response = await request.get('/api/orders/')
                .set('content-type', 'application/json')
                .set(`Authorization`, `Bearer ${TEST_TOKEN}`);
            expect(response.status).toEqual(200);
        })

        it('Gets orders without authentication', async () => {
            const response = await request.get('/api/orders/');
            expect(response.status).toEqual(401);
        })
    })
}