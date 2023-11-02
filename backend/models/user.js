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

export class UserModel {
  static async getAll () {
    const [users] = await connection.query(
      `SELECT * FROM user;`
    )
    return users;
  }

  static async getById ({ username }) {
    const [users] = await connection.query(
      `SELECT *
       FROM user 
       WHERE ? = username;`,
      [username]
    )

    if (users.length === 0) return null

    return users[0]
  }

  static async getByEmail ({ email }) {
    const [users] = await connection.query(
      `SELECT * FROM user 
      WHERE email = ?;`,
      [email]
    )

    if (users.length === 0) return null

    return users
  }

  static async create ({ input }) {
    const {
      username,
      email,
      password,
      role
    } = input

    try {
      await connection.query(
        `INSERT INTO user (username, email, password, role)
          VALUES (?, ?, ?, ?);`,
        [username, email, password, role]
      )
    } catch (e) {
      throw new Error('Error creating user ' + e.message)
    }
  }

  static async delete ({ username }) {
    const [users] = await connection.query(
      `DELETE FROM user WHERE ? = username;`,
      [username]
    )

    if (users.length === 0) return null

    return users[0]
  }

  static async update ({ id, input }) {
    const {
      username,
      email,
      password,
      role
    } = input

    try {
    const [result] = await connection.query(
      `UPDATE user
       SET username = ?, email = ?, password = ?, role = ?
       WHERE username = ?;`,
      [username, email, password, role, id]
    );

    if (result.affectedRows === 0) {
      // Si no se actualizó ningún usuario (el username no se encontró), puedes manejarlo como quieras.
      throw new Error('No se encontró ningún usuario para actualizar.');
    }

    const [updatedUsers] = await connection.query(
      `SELECT *
       FROM user
       WHERE username = ?;`,
      [id]
    );

    if (updatedUsers.length === 0) return null;

    return updatedUsers[0];
    
  } catch (e) {
    console.error('error', e.message)
    throw new Error('Error al actualizar el usuario: ' + e.message);
  }
  }
}