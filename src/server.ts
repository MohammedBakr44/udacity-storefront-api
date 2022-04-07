import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


const { PORT } = process.env;

app.get("/", (request: Request, response: Response) => {
    response.status(200).json({ message: "Hello( ͡° ͜ʖ ͡°)" });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})