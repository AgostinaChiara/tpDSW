import { validateBook, validatePartialBook } from '../schemas/books.js'

export class BookController {
  constructor ({ bookModel }) {
    this.bookModel = bookModel
  }

  getAll = async (req, res) => {
    const { cat, limit, keyword } = req.query
    const books = await this.bookModel.getAll({ cat, limit, keyword })
    res.json(books)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const book = await this.bookModel.getById({ id })
    if (book) return res.json(book)
    res.status(404).json({ message: 'Book not found' })
  }

  getByCategory = async(req, res) => {
    const { cat } = req.params
    const book = await this.bookModel.getByCategory({ cat })
    if (book) return res.json(book)
    res.status(404).json({ message: 'Book not found' })
  }

  create = async (req, res) => {
    const result = validateBook(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newBook = await this.bookModel.create({ input: result.data })

    res.status(201).json(newBook)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.bookModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Book not found' })
    }

    return res.json({ message: 'Book deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialBook(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedBook = await this.bookModel.update({ id, input: result.data })

    return res.json(updatedBook)
  }
}