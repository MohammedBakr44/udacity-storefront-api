import { Product, Products } from '../../models/products';
import { User, Users } from '../../models/users';
import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);

const store = new Products();
const product: Product = {
  name: 'The golden sword of battle',
  price: 50
}
const userStore = new Users();
const user: User = {
  firstname: 'BMO',
  lastname: 'MOE',
  password: 'adventureTime12'
}
let token: string = '';

export default function ProductsSpecHandlers() {

  describe('Products Endpoints', () => {
    beforeAll(async () => {
      const testUser = await userStore.addUser(user);
      const testProduct = await store.addProduct(product);
      if (testProduct.id) product.id = testProduct.id;
      const authUser = await request.post('/api/users/auth').send({
        id: testUser.id,
        password: user.password
      });
      token = authUser.body.data.token;
    })
    it('Index all products', async () => {
      const response = await request.get('/api/products');
      expect(response.status).toEqual(200);
    });
    it('Creates a new product', async () => {
      const response = await request.post('/api/products').send({ product })
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });
    it('Creates a new product without authentication', async () => {
      const response = await request.post('/api/products').send({ name: product.name, price: product.price })
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer `);
      expect(response.status).toEqual(401);
    });
    it('Updates a product', async () => {
      const response = await request.put('/api/products')
        .send({ ...product, price: 100 })
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });
    it('Updates a product without authentication', async () => {
      const response = await request.put('/api/products')
        .send({ ...product, price: 100 })
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer `);
      expect(response.status).toEqual(401);
    });
    it('Gets a product', async () => {
      const response = await request.get(`/api/products/${product.id}`);
      expect(response.status).toEqual(200);
    });
    it('Gets a product with wrong id', async () => {
      const response = await request.get(`/api/products/1`);
      expect(response.status).toEqual(404);
    });
    it('Deletes a product', async () => {
      const response = await request.delete(`/api/products/${product.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });
    it('Deletes a product without authentication', async () => {
      const response = await request.delete(`/api/products/${product.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer `);
      expect(response.status).toEqual(401);
    });
    it('Deletes a product with wrong id', async () => {
      const response = await request.delete(`/api/products/1`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(404);
    })
  })
}
