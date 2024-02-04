import express from 'express';
import { createOrder, getAllOrders, getOrderById, getUserOrders } from '../controllers/order';

const router = express.Router();

router.post('/', createOrder);

router.get('/', getAllOrders);
router.get('/user/:userId', getUserOrders);
router.get('/:id', getOrderById)

export default router;