import { Router } from 'express';
import { createBook, deleteBook, getBooks, getByCategory, getById, updateBook } from '../controllers/book';
import upload from '../utils/multer';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getById);
router.get('/categories/:cat', getByCategory);

router.post('/', upload.single("file"), createBook);

router.patch('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router;