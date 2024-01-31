import { Request, Response } from 'express';
import { Order, OrderItem } from '../models/order';
import { Book } from '../models/book';
import { User } from '../models/user';
import sequelize from '../db/connection';
import { Category } from '../models/category';

export const createOrder = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const { userId, email, items, total } = req.body;

    const order: any = await Order.create({ userId, email, total }, { transaction: t });

    for (const item of items) {
      const book: any = await Book.findByPk(item.id, { transaction: t });

      if (book) {
        if (book.stock < item.quantity) {
          throw new Error(`No hay suficiente stock para el libro con ID ${item.id}.`);
        }

        book.stock -= item.quantity;
        await book.save({ transaction: t });
        
        await order.addBook(book, { through: { quantity: item.quantity }, transaction: t });

      } else {
        console.error(`El libro con ID ${item.id} no fue encontrado.`);
        continue;
      }
    }

    await t.commit();
    return res.status(201).json({ message: 'Orden creada exitosamente', order });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    await t.rollback();
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({ 
      include: [{
        model: Book,
        include: [{
          model: Category,
          as: 'category'
        }]
      }]
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const orders = await Order.findAll({
      where: { userId: userId},
      include: [
        {
          model: User,
          as: 'user'
        },
        {
          model: Book
        }
      ]
    });
    if (orders.length === 0) {
      return res.status(404).json({message: "No se encontraron ordenes de este usuario."})
    }
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor. "})
  }
}