import express, { NextFunction, request, Request, Response } from 'express';
import { User, Users } from '../models/users';

const store = new Users();

export const index = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await store.index();

        response.status(200).json({
            status: '200 OK',
            data: users
        });
    } catch (error) {
        next(error);
    }

}

export const create = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await store.addUser(request.body);
        response.status(200).json({
            status: '200 OK',
            data: { ...user }
        })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await store.getUser(request.params.id);
        response.status(200).json({
            status: '200 OK',
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await store.updateUser(request.body);
        response.status(200).json({
            status: '200 OK',
            data: user
        })
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await store.deleteUser(request.params.id);
        response.status(200).json({
            status: '200 OK',
            data: user
        })
    } catch (error) {
        next(error);
    }
}