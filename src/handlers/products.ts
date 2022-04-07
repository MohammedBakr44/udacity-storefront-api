import express, { Request, Response } from 'express';

const index = async (request: Request, response: Response) => {
    await response.json({ Products: [] });
}

const Products_route = (app: express.Application) => {
    app.get("/products", index);
};

export default Products_route;