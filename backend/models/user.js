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
  static async register({ username, email, password, role }) {
    try {
      console.log({username, email, password, role})
      await connection.query(
        `INSERT INTO user (username, email, password, role)
          VALUES (?, ?, ?, ?);`,
        [username, email, password, role]
      );
    } catch (e) {
      throw new Error('Error registering user ' + e.message);
    }
  }

  static async login({ username, password }) {
    try {
      const [user] = await connection.query(
        `SELECT * FROM user WHERE username = ? AND password = ?;`,
        [username, password]
      );
      console.log(user)
      
      if (user.length === 0) return null;
  
      return user[0];
    } catch(error) {
      console.error('Error en la consulta sql ' + error.message)
      throw error
    }
  }

  static async deleteUser({ id }) {
    const [user] = await connection.query(
      `DELETE FROM user WHERE id = ?;`,
      [id]
    );

    if (user.length === 0) return null;

    return user[0];
  }

  static async updateUser({ id, updates }) {
    const { username, email, password, role } = updates;

    try {
      const [result] = await connection.query(
        `UPDATE user
         SET username = ?, email = ?, password = ?, role = ?
         WHERE id = ?;`,
        [username, email, password, role, id]
      );

      if (result.affectedRows === 0) {
        throw new Error('No se encontró ningún usuario para actualizar.');
      }

      const [updatedUser] = await connection.query(
        `SELECT * FROM user WHERE id = ?;`,
        [id]
      );

      if (updatedUser.length === 0) return null;

      return updatedUser[0];
    } catch (e) {
      throw new Error('Error al actualizar el usuario: ' + e.message);
    }
  }
}