import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Orders_route from './handlers/orders';
import Products_route from './handlers/products';
import Users_route from './handlers/users';

dotenv.config();

const app = express();


const { PORT } = process.env;

app.get("/", (request: Request, response: Response) => {
    response.status(200).json({ message: "Hello( ͡° ͜ʖ ͡°)" });
})

Orders_route(app);
Products_route(app);
Users_route(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})