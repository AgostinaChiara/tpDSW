import { Request, Response } from 'express'
import { Book } from '../models/book'
import { Op } from 'sequelize';
import { Category } from '../models/category';

interface BookOptions {
  where?: any; 
  limit?: number;
  order?: any[];
}

export const getBooks = async (req: Request, res: Response) => {
  // Obtenemos los parámetros de consulta de la solicitud
  const { name, limit, orderBy } = req.query;
  
  // Crea un objeto de opciones para personalizar la búsqueda
  const options: BookOptions = {};

  // Agrega una cláusula WHERE para buscar por nombre si se proporciona
  if (name) {
    options.where = {
      title: {
        [Op.like]: `%${name}%`, // Búsqueda parcial por nombre
      },
    };
  }

  // Agrega una cláusula de ordenamiento si se proporciona
  if (orderBy) {
    if (orderBy === 'lowerPrice') {
      options.order = [['price', 'ASC']];
    } else if (orderBy === 'higherPrice') {
      options.order = [['price', 'DESC']];
    } else if (orderBy === 'relevance') {
      options.order = [['isbn', 'ASC']]
    }
  }

  // Agrega una cláusula de límite si se proporciona
  if (limit) {
    options.limit = parseInt(limit as string);
  }
  
  try {
    const listBooks = await Book.findAll({
      ...options,
      include: [{model: Category, as: 'category', attributes: ['name']}]
    });
    res.json(listBooks);
  } catch (error) {
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
    await Book.create(body);

    res.status(201).json({
      msg: `Book created successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Oops, there was an error`,
    });
  }
}

export const updateBook = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);

    if(book) {
      await book.update(body);
      res.status(200).json({
        msg: 'The book was updated successfully',
      });
    } else {
      res.status(404).json({
          msg: `Book with ISBN ${id} not found`
      })
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
        msg: `Book with ISBN ${id} not found`,
      });
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (!book) {
      res.status(404).json({
          msg: `Book with ISBN ${id} not found`
      })
  } else {
      await book.destroy();
      res.status(200).json({
          msg: 'Book deleted successfully!!'
      })
  }
}
