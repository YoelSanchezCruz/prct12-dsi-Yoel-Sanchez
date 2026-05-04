import { Request, Response } from 'express';
import { Book } from '../models/book.js';

type BookGenre = "Fiction" | "Non-Fiction" | "Science" | "History" | "Fantasy" | "Biography";

export interface filterInterface {
  genre?: BookGenre,
  author?: string
}

/**
 * Petición para añadir un libro a la base de datos
 * @returns Una promesa que se resuelve con el libro añadido o se rechaza con un error
 */
export const createBook = async (req: Request, res: Response) => {
  const book = new Book(req.body);

  try {
    const existe = await Book.findOne({ isbn: book.isbn });
    if (existe) {
      return res.status(400).send({
        error: "El libro ya existe en la base de datos"
      });
    }

    const savedBook = await book.save();
    return res.status(201).send(savedBook);
  } catch (error) {
    return res.status(500).send(error);
  }
};


/**
  * Petición para obtener un libro concreto según su ID
  * @returns Una promesa que se resuelve con el libro solicitado o se rechaza con un error
  */
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send({
        error: "Libro no encontrado"
      });
    }

    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send(error);
  }
};


/**
  * Petición para obtener todos los libros almacenados, permitiendo filtrar por genre y/o author
  * @returns Una promesa que se resuelve con los libros solicitados o se rechaza con un error
  */
export const getBook = async (req: Request, res: Response) => {
  let filter: filterInterface = {};
  
  if (req.query.genre) {
    filter.genre = req.query.genre as BookGenre;
  }
  
  if (req.query.author) {
    filter.author = req.query.author.toString();
  }
  
  try {
    const books = await Book.find(filter);
  
    if (books.length === 0) {
      return res.status(404).send({
        error: "Libros no encontrados"
      });
    }
  
    return res.send(books);
  } catch (error) {
    return res.status(500).send(error);
  }
};


/**
  * Petición para modificar un libro a la base de datos
  * @returns Una promesa que se resuelve con el libro modificado o se rechaza con un error
  */
export const patchBook = async (req: Request, res: Response) => {
  const allowedUpdates = ['title', 'author', 'genre', 'year', 'pages', 'available', 'rating'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));
        
  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'La actualización no está permitida',
    });
  }
    
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).send({
        error: "El libro que se quiere modificar no existe"
      });
    }
              
    return res.send(book);
  } catch (error) {
    return res.status(500).send(error);
  }
};


/**
  * Petición para eliminar un libro a la base de datos
  * @returns Una promesa que se resuelve con el libro eliminado o se rechaza con un error
  */
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
  
    if (!book) {
      return res.status(404).send({
        error: "No existe el libro a eliminar"
      });
    }
  
    return res.send(book);
  } catch (error) {
    return res.status(500).send(error);
  }
}