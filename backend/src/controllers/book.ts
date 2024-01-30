import { Request, Response } from 'express'
import { Book } from '../models/book'
import { Op } from 'sequelize';
import { Category } from '../models/category';

import cloudinary from '../utils/cloudinary';
import upload from '../utils/multer';

export const getBooks = async (req: Request, res: Response) => {
  const { name, limit } = req.query;

  try {
    const options: any = {
      include: [{ model: Category, as: 'category', attributes: ['name'] }],
    };

    if (name) {
      options.where = {
        title: {
          [Op.like]: `%${name}%`,
        },
      };
    }

    if (limit) {
      options.limit = parseInt(limit as string, 10);
    }

    const listBooks = await Book.findAll(options);
    res.json(listBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la consulta de libros' });
  }
  
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params
  const book = await Book.findByPk(id);
  if (book) {
    return res.json(book)
  } else {
    res.status(404).json({ message: 'Book not found' })
  }
}

export const getByCategory = async(req: Request, res: Response) => {
  const { cat } = req.params
  const book = await Book.findAll({
    where: {
      categoryId: cat
    }
  });
  if (book) return res.json(book)
  res.status(404).json({ message: 'Book not found' })
}

export const getFeaturedBooks = async (req: Request, res: Response) => {
  const listBooks = await Book.findAll({ limit: 4 });
  
  res.json(listBooks)
}

export const createBook = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    if (!req.file) {
      return res.status(400).json({
        msg: 'Falta cargar el archivo.',
      });
    }

    const existingBook = await Book.findByPk(body.isbn)
    if(existingBook) {
      return res.status(400).json({
        msg: "El ISBN ya esta en uso."
      })
    }

    const result = await cloudinary.uploader.upload(req.file?.path);
    const imageUrl = result.url;
    
    await Book.create({ ...body, image: imageUrl })

    res.status(201).json({
      msg: `Libro creado exitosamente!`,
    });
  } catch (error) {
    console.error("Error:",error);
    res.status(500).json({
      msg: `Oops, hubo un error`,
    });
  }
}

export const updateBook = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);

    if(book) {

      if (body.file === null || body.file === undefined) {
        delete body.file;
      }

      await book.update({ ...body });

      res.status(200).json({
        msg: 'El libro se actualizo correctamente!',
      });
    } else {
      res.status(404).json({
          msg: `El libro con ISBN ${id} no se encontro.`
      })
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
        msg: `El libro con ISBN ${id} no se encontro.`,
      });
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book: any = await Book.findByPk(id);

  if (!book) {
      res.status(404).json({
          msg: `El libro con ISBN ${id} no se encontro.`
      })
  } else {
      await cloudinary.uploader.destroy(book.image.split('/').pop().split('.')[0]);
      await book.destroy();
      res.status(200).json({
          msg: 'Libro eliminado correctamente!!'
      })
  }
}
