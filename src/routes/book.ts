import { Router } from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers';

export const bookRoute = () => {
	const router = Router();

	router.post('/book', createBook);

	router.get('/books', getAllBooks);

	router.get('/book/:id', getBookById);

	router.put('/book/:id', updateBook);

	router.delete('book/:id', deleteBook);

	return router;
};
