import { NextFunction, Request, Response } from 'express';
import { Products } from '../models/products';

const store = new Products();
export const index = async (_request: Request, response: Response) => {
  try {
    const products = await store.index();
    response.status(200).json({
      status: '200 OK',
      data: products
    });
  } catch (error) {
    response.status(400);
  }
};

export const create = async (request: Request, response: Response) => {
  try {
    const product = await store.addProduct(request.body);
    response.status(200).json({
      status: '200 OK',
      data: { ...product }
    });
  } catch (error) {
    response.status(401);
  }
};

export const getProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product = await store.getProduct(request.params.id);
    response.status(200).json({
      status: '200 OK',
      data: product
    });
  } catch (error) {
    response.status(400);
    next();
  }
};

export const updateProduct = async (request: Request, response: Response) => {
  try {
    const product = await store.updateProduct(request.body);
    response.status(200).json({
      status: '200 OK',
      data: product
    });
  } catch (error) {
    response.status(401);
  }
};

export const deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product = await store.deleteProduct(request.params.id);
    response.status(200).json({
      status: '200 OK',
      data: product
    });
  } catch (error) {
    response.status(401);
    next();
  }
};
