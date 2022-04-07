import express, { Request, Response } from 'express';

const index = async (request: Request, response: Response) => {
    response.json({ Users: [] });
}

const Users_route = (app: express.Application) => {
    app.get("/users", index);
};

export default Users_route;