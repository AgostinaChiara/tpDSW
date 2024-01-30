import { Request, Response } from 'express';
import { Order, OrderItem } from '../models/order';
import { Book } from '../models/book';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, email, items, total } = req.body;

    const order: any = await Order.create({ userId, email, total });

    for (const item of items) {
      const book = await Book.findByPk(item.id);

      if (book) {
          await order.addBook(book, { through: { quantity: item.quantity } });
      } else {
          console.error(`El libro con ID ${item.id} no fue encontrado.`);
      }
    }

    return res.status(201).json({ message: 'Orden creada exitosamente', order });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({ include: 'books' });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
};