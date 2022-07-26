import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';

import { routes } from './routes';

import createConnection from '../database/typeorm';

createConnection();

const app = express();

app.use(express.json());

app.use(routes);

export { app };
