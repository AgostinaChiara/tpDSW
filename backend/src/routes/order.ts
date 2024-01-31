import express from 'express';
import { createOrder, getAllOrders, getUserOrders } from '../controllers/order';

const router = express.Router();

router.post('/', createOrder);

router.get('/', getAllOrders);
router.get('/:userId', getUserOrders);

export default router;