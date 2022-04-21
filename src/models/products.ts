import Client from '../database';

export type Product = {
  id?: string;
  name: string;
  price: number;
};

export class Products {
  async addProduct(p: Product): Promise<Product> {
    const connection = await Client.connect();
    try {
      const query = `INSERT INTO Products 
            (name, price) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(query, [p.name, p.price]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      connection.release();
      throw new Error(`Unable to create product`);
    }
  }
  // Show all products
  async index(): Promise<Product[]> {
    const connection = await Client.connect();
    try {
      const query = 'SELECT * FROM Products';
      const result = await connection.query(query);
      connection.release();
      return result.rows as Product[];
    } catch (err) {
      connection.release();
      throw new Error('Unable to fetch products');
    }
  }

  async getProduct(id: string): Promise<Product> {
    const connection = await Client.connect();
    try {
      const query = 'SELECT * FROM Products WHERE id =($1)';
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      connection.release();
      throw new Error(`Could not find product ${(error as Error).message}`);
    }
  }

  async updateProduct(product: Product): Promise<Product> {
    const connection = await Client.connect();
    try {
      const query = `UPDATE Products 
                           SET name=$1, price=$2 where id=$3 RETURNING *`;
      const result = await connection.query(query, [product.name, product.price, product.id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      connection.release();
      throw new Error(`Could not update product, ${(error as Error).message}`);
    }
  }

  async deleteProduct(id: string): Promise<Product> {
    const connection = await Client.connect();
    try {
      const query = `DELETE FROM Products where id=($1) RETURNING *`;
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      connection.release();
      throw new Error(`Could not delete product, ${(error as Error).message}`);
    }
  }
}
