import { Product, Products } from '../../models/products';
import { User, Users } from '../../models/users';
import { app } from '../../server';
import supertest from 'supertest';
import { TokenExpiredError } from 'jsonwebtoken';

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

export default function ProductsSpecModel() {
  describe('Products model', () => {
    it('Has addProduct method', () => {
      expect(store.addProduct).toBeDefined();
    });

    it('Has index method', () => {
      expect(store.index).toBeDefined();
    });

    it('Has get product method', () => {
      expect(store.getProduct).toBeDefined();
    });

    it('Has update product method', () => {
      expect(store.updateProduct).toBeDefined();
    });

    it('Has delete product method', () => {
      expect(store.deleteProduct).toBeDefined();
    });
  });
  describe('Products CRUD', () => {
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
    it('adds a product', async () => {
      const result = await store.addProduct(product);
      expect(result.name).toEqual(product.name);
    })
    it('index all the products', async () => {
      const result = await store.index();
      expect(result).toBeTruthy();
    })
    it('gets a product', async () => {
      const result = await store.getProduct(product.id as string);
      expect(result.id).toEqual(product.id);
    })
    it('updates a product', async () => {
      const result = await store.updateProduct({ ...product, price: 100 });
      expect({ id: result.id, name: result.name }).toEqual({ id: product.id, name: product.name });
    })
    it('deletes a product', async () => {
      const result = await store.deleteProduct(product.id as string);
      expect(result.id).toEqual(product.id);
    })
  })
}
