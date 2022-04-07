import express, { Request, Response } from 'express';
import { Product, Products } from '../models/products';

const store = new Products();

const index = async (request: Request, response: Response) => {
    const prods = await store.index();
    response.json({ Products: prods });
}

const Products_route = (app: express.Application) => {
    app.get("/products", index);
};

export default Products_route;