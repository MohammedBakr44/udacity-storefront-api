import Client from '../database';

export type Order = {
  id?: string;
  products_id: [];
  quantity: number;
  user_id: string;
  status: string;
};

export class Orders {
  async getOrder(id: string): Promise<Order> {
    const connection = await Client.connect();
    try {
      const query = 'SELECT * FROM Orders WHERE id=($1)';
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      connection.release();
      throw new Error('Cannot find order');
    }
  }

  async getOrderProducts(): Promise<Order[]> {
    const connection = await Client.connect();
    try {
      const query =
        'SELECT * FROM Products INNER JOIN order_products ON products.id=order_products.product_id';
      const result = await connection.query(query);
      connection.release();
      return [...result.rows];
    } catch (error) {
      connection.release();
      throw new Error('cannot get orders');
    }
  }

  async addOrder(order: Order): Promise<Order> {
    const connection = await Client.connect();
    try {
      const query = 'INSERT INTO Orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(query, [order.status, order.user_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      connection.release();
      throw new Error(`Cannot create order: ${error}`);
    }
  }

  async addProductToOrder(
    order_id: string,
    product_id: string,
    product_quantity: number
  ): Promise<{
    id: string;
    quantity: number;
    order_id: string;
    product_id: string;
  }> {
    const connection = await Client.connect();
    try {
      const query =
        'INSERT INTO Order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(query, [order_id, product_id, product_quantity]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      connection.release();
      throw new Error(`Cannot add product, ${error}`);
    }
  }
}
