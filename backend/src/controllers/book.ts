import { Request, Response } from 'express'
import { Book } from '../models/book'
import { Op } from 'sequelize';

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
    const listBooks = await Book.findAll(options);
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

      res.json({
          msg: `Book created successfully!`
      })
  } catch (error) {
      console.log(error);
      res.json({
          msg: `Woo, there was an error`
      })
  }
}

export const updateBook = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {

      const book = await Book.findByPk(id);

  if(book) {
      await book.update(body);
      res.json({
          msg: 'El libro fue actualizado con exito'
      })

  } else {
      res.status(404).json({
          msg: `No existe un libro con el isbn ${id}`
      })
  }
      
  } catch (error) {
      console.log(error);
      res.json({
          msg: `Upps ocurrio un error, comuniquese con soporte`
      })
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (!book) {
      res.status(404).json({
          msg: `No existe un libro con el isbn ${id}`
      })
  } else {
      await book.destroy();
      res.json({
          msg: 'El libro fue eliminado con exito!'
      })
  }

}
