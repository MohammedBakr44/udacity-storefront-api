import express, { NextFunction, Request, Response } from 'express';
import { Order, Orders } from '../models/orders';

const store = new Orders();

export const show = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = await store.getOrder(request.params.id);
        response.status(200).json({
            status: '200 OK',
            data: order
        })
    } catch (error) {
        next(error);
    }
}

export const getOrderProducts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = await store.getOrderProducts();
        response.status(200).json({
            stauts: '200 OK',
            data: order
        })
    } catch (error) {
        next(error)
    }
}

export const create = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = await store.addOrder(request.body);
        response.status(200).json({
            status: '200 OK',
            data: { ...order }
        })
    } catch (error) {
        next(error);
    }

}

export const createProduct = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = await store.addProductToOrder(request.body.order_id, request.body.product_id, request.body.product_quantity);
        response.status(200).json({
            status: '200 OK',
            data: product
        })
    } catch (error) {
        next(error)
    }
}
