import express from 'express';
import { createOrder, getAllOrders, getOrderById, getOrdersByMonth, getUserOrders } from '../controllers/order';

const router = express.Router();

router.post('/', createOrder);

router.get('/', getAllOrders);
router.get('/user/:userId', getUserOrders);
router.get('/by-month', getOrdersByMonth)
router.get('/:id', getOrderById)

export default router;