import express, { json } from 'express'
import { createBookRouter } from './routes/books.js'
import { createCategoryRouter } from './routes/category.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'

export const createApp = ({ bookModel, categoryModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/books', createBookRouter({ bookModel }))
  app.use('/category', createCategoryRouter({ categoryModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
