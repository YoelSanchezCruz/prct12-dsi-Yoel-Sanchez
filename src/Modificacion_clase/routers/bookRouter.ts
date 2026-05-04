import express from 'express';
import { Book } from '../models/book.js';
import { createBook, getBookById, getBook, patchBook, deleteBook } from '../controllers/bookController.js'

export const bookRouter = express.Router();

/**
  * Petición para añadir un libro a la base de datos
  * @params '/books' - Ruta
  * @returns Una promesa que se resuelve con el libro añadido o se rechaza con un error
  */
bookRouter.post('/books', createBook);


/**
  * Petición para obtener un libro concreto según su ID
  * @params '/books/:id' - Ruta indicando el ID del libro
  * @returns Una promesa que se resuelve con el libro solicitado o se rechaza con un error
  */
bookRouter.get('/books/:id', getBookById);


/**
  * Petición para obtener todos los libros almacenados, permitiendo filtrar por genre y/o author
  * @params '/books' - Ruta
  * @returns Una promesa que se resuelve con los libros solicitados o se rechaza con un error
  */
bookRouter.get('/books', getBook);


/**
  * Petición para modificar un libro a la base de datos
  * @params '/books/:id' - Ruta indicando el ID del libro
  * @returns Una promesa que se resuelve con el libro modificado o se rechaza con un error
  */
bookRouter.patch('/books/:id', patchBook);


/**
  * Petición para eliminar un libro a la base de datos
  * @params '/books' - Ruta indicando el ID del libro
  * @returns Una promesa que se resuelve con el libro eliminado o se rechaza con un error
  */
bookRouter.delete('/books/:id', deleteBook);
