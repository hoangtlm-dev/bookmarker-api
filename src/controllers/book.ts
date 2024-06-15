import { Request, Response } from 'express';
import { Book } from '../models';
import { IBookInput } from '../types';
import { RESPONSE_STATUS } from '../constants';

export const createBook = async (req: Request, res: Response) => {
	const { name, authors, image, publishedDate, description } = req.body;

	if (!name || !authors || !image || !publishedDate || !description) {
		return res.status(RESPONSE_STATUS.UNPROCESSABLE_CONTENT).json({
			message: 'The field is required'
		});
	}

	const bookInput: IBookInput = {
		name,
		authors,
		image,
		publishedDate,
		description
	};

	const bookCreated = await Book.create(bookInput);

	return res.status(RESPONSE_STATUS.CREATED).json({ data: bookCreated });
};

export const getAllBooks = async (req: Request, res: Response) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 6;
	const search = String(req.query.search || '');
	const sort = String(req.query.sort || '-createdAt');

	const query = {
		$or: [{ name: { $regex: search, $options: 'i' } }, { authors: { $regex: search, $options: 'i' } }]
	};

	const books = await Book.find(query)
		.sort(sort)
		.skip((page - 1) * limit)
		.limit(limit)
		.exec();

	const totalBooks = await Book.countDocuments(query);

	return res.status(RESPONSE_STATUS.OK).json({
		data: books,
		metaData: {
			totalDocuments: totalBooks,
			pageNumber: page,
			totalPages: Math.ceil(totalBooks / limit)
		}
	});
};

export const getBookById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const book = await Book.findOne({ _id: id });

	if (!book) {
		return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: `Book with id "${id}" not found.` });
	}

	return res.status(RESPONSE_STATUS.OK).json({ data: book });
};

export const updateBook = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, authors, image, publishedDate, description } = req.body;

	const book = await Book.findOne({ _id: id });

	if (!book) {
		return res.status(RESPONSE_STATUS.NOT_FOUND).json({ message: `Book with id "${id}" not found.` });
	}

	if (!name || !authors || !image || !publishedDate || !description) {
		return res.status(RESPONSE_STATUS.UNPROCESSABLE_CONTENT).json({
			message: 'The field is required'
		});
	}

	const bookInput: IBookInput = {
		name,
		authors,
		image,
		publishedDate,
		description
	};

	await Book.updateOne({ _id: id }, bookInput);

	const bookUpdated = await Book.findById(id, bookInput);

	return res.status(RESPONSE_STATUS.OK).json({ data: bookUpdated });
};

export const deleteBook = async (req: Request, res: Response) => {
	const { id } = req.params;

	await Book.findByIdAndDelete(id);

	return res.status(RESPONSE_STATUS.OK).json({ message: 'Book deleted successfully.' });
};
