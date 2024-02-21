import { Request, Response } from 'express'
import { Category } from '../models/category'

export const getCategories = async (req: Request, res: Response) => {
	try {
		const listCats = await Category.findAll();
		res.status(200).json(listCats);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
	}
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params
  const cat = await Category.findByPk(id)
  if (cat) return res.status(200).json(cat);
  res.status(404).json({ error: 'Category not found' })
}

export const createCategory = async (req: Request, res: Response) => {
  const { body } = req;

  try {
      await Category.create(body);

      res.status(201).json({
          msg: `Category created successfully!`
      })
  } catch (error) {
      res.status(500).json({
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
      res.status(200).json({
          msg: 'The category was updated successfully'
      })

  } else {
      res.status(404).json({
          msg: `No category found with ID ${id}`
      })
  }
      
  } catch (error) {
      res.status(500).json({
          msg: `Oops, an error occurred. Please contact support.`
      })
  }
}