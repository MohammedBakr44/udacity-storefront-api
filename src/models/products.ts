import Client from '../database';

export type Product = {
    id: number,
    name: string,
    price: number
}

export class Products {
    async index(): Promise<Products[]> {
        const connection = Client.connect();
        const query = "SELECT * FROM Products";
        const result = await (await connection).query(query);
        return result.rows as Products[];
    }
}