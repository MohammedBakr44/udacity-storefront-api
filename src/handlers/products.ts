import express, { NextFunction, Request, Response } from 'express';
import { Product, Products } from '../models/products';

const store = new Products();
export const index = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const products = await store.index();
    response.status(200).json({
      status: '200 OK',
      data: products
    });
  } catch (error) {
    response.status(400);
    next(error);
  }
};

export const create = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product = await store.addProduct(request.body);
    response.status(200).json({
      status: '200 OK',
      data: { ...product }
    });
  } catch (error) {
    response.status(401);
    next(error);
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
    next(error);
  }
};

export const updateProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product = await store.updateProduct(request.body);
    response.status(200).json({
      status: '200 OK',
      data: product
    });
  } catch (error) {
    response.status(401);
    next(error);
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
    next(error);
  }
};
