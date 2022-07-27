import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';

import { AppError } from '@infra/shared/utils/app-error';
import { routes } from './routes';

import createConnection from '../database/typeorm';
import '../container';

createConnection();

const app = express();

app.use(express.json());

app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            message: 'Internal Server Error',
        });
    },
);

export { app };
