import express from 'express';
import './db/mongoose.js';
import { app } from './app.js'
import { bookRouter } from './routers/bookRouter.js';
import { defaultRouter } from './routers/defaultRouter.js';

const port = process.env.PORT || 3000;

// Escuchamos el puerto
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});