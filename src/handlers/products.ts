import express, { NextFunction, Request, Response } from 'express';
import { Product, Products } from '../models/products';

const store = new Products();

export const index = async (request: Request, response: Response) => {
    const prods = await store.index();
    response.json({ Products: prods });
}

export const create = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = await store.addProduct(request.body);
        response.status(200).json({
            status: '200 OK',
            data: { ...product }
        })
    } catch (error) {
        next(error);
    }
}