import express, { Request, Response } from 'express';

const index = async (request: Request, response: Response) => {
    response.json({ Orders: [] });
}

const Orders_route = (app: express.Application) => {
    app.get("/orders", index);
};

export default Orders_route;