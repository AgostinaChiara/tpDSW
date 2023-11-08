import { Router } from 'express';
import { createCategory, getById, getCategories, updateCategory } from '../controllers/category';

const router = Router();

router.get('/', getCategories)
router.get('/:id', getById)

router.post('/', createCategory)

router.patch('/:id', updateCategory);

export default router;