import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'books_database'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class BookModel {
  static async getAll ({ cat, limit, keyword }) {
    if (cat) {
      const lowerCaseCat = cat.toLowerCase()

      // get category ids from database table using genre names
      const [catId] = await connection.query(
        'SELECT id FROM category WHERE LOWER(name) = ?;',
        [lowerCaseCat]
      )
      
      // no genre found
      if (catId.length === 0) return []
      
      // get the id from the first genre result
      const id = catId[0]
      const [books] = await connection.query(
        'SELECT book.* FROM category INNER JOIN book ON category.id = book.category WHERE category.id = ?,',
        [id]
      )
      return books
    }

    if(keyword) {
      keyword = '%' + keyword + '%'
      const [books] = await connection.query(
        'SELECT * FROM book WHERE title LIKE ?',
        [keyword]
      )
      return books
    }

    if(limit) {
      const [books] = await connection.query(
        'SELECT * FROM book LIMIT ?',
        [Number(limit)]
      )
      return books
    } else {
      const [books] = await connection.query(
        'SELECT * FROM book;'
      )
      return books
    }
  }

  static async getById ({ id }) {
    const [books] = await connection.query(
      `SELECT *
       FROM book WHERE ? = isbn;`,
      [id]
    )

    if (books.length === 0) return null

    return books[0]
  }

  static async getByCategory ({ cat }) {
    const [books] = await connection.query(
      `SELECT b.* FROM category c INNER JOIN book b ON c.id = b.category WHERE c.name = ?;`,
      [cat]
    )

    if (books.length === 0) return null

    return books
  }

  static async create ({ input }) {
    const {
      genre: genreInput, // genre is an array
      isbn,
      title,
      year,
      author,
      image,
      price,
      pages,
      language
    } = input

    try {
      await connection.query(
        `INSERT INTO book (isbn, title, year, author, image, price, pages, language)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [isbn, title, year, author, image, price, pages, language]
      )
    } catch (e) {
      throw new Error('Error creating book')
    }

    const [books] = await connection.query(
      `SELECT isbn, title, year, author, image, price, pages, language
        FROM book WHERE id = isbn;`
    )

    return books[0]
  }

  static async delete ({ id }) {
    const [books] = await connection.query(
      `DELETE FROM book WHERE ? = isbn;`,
      [id]
    )

    if (books.length === 0) return null

    return books[0]
  }

  static async update ({ id, input }) {

  }
}