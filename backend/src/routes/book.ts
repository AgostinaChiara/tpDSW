import { Router } from 'express';
import { createBook, deleteBook, getBooks, getByCategory, getById, getFeaturedBooks, updateBook } from '../controllers/book';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getById);
router.get('/categories/:cat', getByCategory);

router.post('/', createBook);

router.patch('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router;