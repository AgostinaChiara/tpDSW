import { Router } from 'express'
import { BookController } from '../controllers/books.js'

export const createBookRouter = ({ bookModel }) => {
  const booksRouter = Router()

  const bookController = new BookController({ bookModel })

  booksRouter.get('/', bookController.getAll)
  booksRouter.post('/', bookController.create)

  booksRouter.get('/:id', bookController.getById)
  booksRouter.delete('/:id', bookController.delete)
  booksRouter.patch('/:id', bookController.update)

  booksRouter.get('/categories/:cat', bookController.getByCategory)

  return booksRouter
}