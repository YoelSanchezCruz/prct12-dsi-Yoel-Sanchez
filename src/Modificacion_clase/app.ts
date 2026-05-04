import express from 'express';
import './db/mongoose.js';
import { bookRouter } from './routers/bookRouter.js';
import { defaultRouter } from './routers/defaultRouter.js';

export const app = express();
app.use(express.json());
app.use(bookRouter);
app.use(defaultRouter);