import { Request, Response } from 'express'
import { Category } from '../models/category'

export const getCategories = async (req: Request, res: Response) => {
  const listCats = await Category.findAll();
  
  res.json(listCats)
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params
  const cat = await Category.findByPk(id)
  if (cat) return res.json(cat)
  res.status(404).json({ message: 'Category not found' })
}

export const createCategory = async (req: Request, res: Response) => {
  const { body } = req;

  try {
      await Category.create(body);

      res.json({
          msg: `Category created successfully!`
      })
  } catch (error) {
      console.log(error);
      res.json({
          msg: `Woo, there was an error`
      })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {

      const category = await Category.findByPk(id);

  if(category) {
      await category.update(body);
      res.json({
          msg: 'La categoria fue actualizado con exito'
      })

  } else {
      res.status(404).json({
          msg: `No existe una categoria con el id ${id}`
      })
  }
      
  } catch (error) {
      console.log(error);
      res.json({
          msg: `Upps ocurrio un error, comuniquese con soporte`
      })
  }
}