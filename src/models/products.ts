import Client from '../database';

export type Product = {
    id: number,
    name: string,
    price: number
}

export class Products {

    async addProduct(p: Product): Promise<Product> {
        try {
            const connection = await Client.connect();
            const query = `INSERT INTO Products (id, name, price) VALUES ($1, $2, $3) RETURNING *`;
            const result = await connection.query(query, [
                p.id,
                p.name,
                p.price
            ]);
            connection.release();
            return result.rows[0];

        } catch (err) {
            console.log(err);
            throw new Error(`Unable to create product`);
        }
    }

    async index(): Promise<Product[]> {
        try {
            const connection = await Client.connect();
            const query = "SELECT * FROM Products";
            const result = await connection.query(query);
            connection.release();
            return result.rows as Product[];
        } catch (err) {
            throw new Error('Unable to fetch products');
        }
    }
}