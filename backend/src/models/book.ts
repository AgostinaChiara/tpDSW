import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Book = sequelize.define('book', {
  isbn: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  publisher: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pages: {
    type: DataTypes.INTEGER
  },
  language: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  timestamps: false
})