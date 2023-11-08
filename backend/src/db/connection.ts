import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('books_database', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;