import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { User } from './user';
import { Book } from './book';

export const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true
});

export const OrderItem = sequelize.define('orderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.belongsToMany(Book, { through: OrderItem });
Book.belongsToMany(Order, { through: OrderItem });