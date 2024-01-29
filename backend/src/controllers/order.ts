import { Request, Response } from 'express';
import { Order, OrderItem } from '../models/order';
import { Book } from '../models/book';

export const createOrder = async (req: Request, res: Response) => {
  
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