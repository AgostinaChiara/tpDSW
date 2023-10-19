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

export class CategoryModel {
  static async getAll () {
    console.log("getall categories")
    const [categs] = await connection.query(
      'SELECT * FROM category'
    )
    return categs
  }

  static async getById ({ id }) {
    const [categs] = await connection.query(
      `SELECT *
       FROM category WHERE ? = id;`,
      [id]
    )

    if (categs.length === 0) return null

    return categs[0]
  }

  static async getByCategory ({ cat }) {
    
  }

  static async create ({ input }) {
    
  }

  static async delete ({ id }) {
    
  }

  static async update ({ id, input }) {

  }
}