import { Router } from 'express'
import { CategoryController } from '../controllers/category.js'


export const createCategoryRouter = ({ categoryModel }) => {
  const catsRouter = Router()

  const categoryController = new CategoryController({ categoryModel })

  catsRouter.get('/', categoryController.getAll)
  catsRouter.post('/', categoryController.create)

  catsRouter.get('/:id', categoryController.getById)

  return catsRouter
}