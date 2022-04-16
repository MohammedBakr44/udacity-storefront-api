import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';


dotenv.config();

const app = express();

app.use(express.json());

const { PORT } = process.env;

app.get("/", (request: Request, response: Response) => {
    response.status(200).json({ message: "Hello( ͡° ͜ʖ ͡°)" });
})

app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})