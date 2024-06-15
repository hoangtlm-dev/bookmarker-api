import { Request, Response } from 'express';

import { Book } from 'models';
import { IBookInput } from 'types';

export const createBook = async (req: Request, res: Response) => {
	const { name, authors, image, publishedDate, description } = req.body;

	if (!name || !authors || !image || !publishedDate || !description) {
		return res.status(422).json({
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

	const bookCreated = Book.create(bookInput);

	return res.status(201).json({ data: bookCreated });
};

export const getAllBooks = async (req: Request, res: Response) => {
	const books = await Book.find().sort('-createdAt').exec();

	return res.status(200).json({ data: books });
};

export const getBookById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const book = await Book.findOne({ _id: id });

	if (!book) {
		return res.status(404).json({ message: `Book with id "${id}" not found.` });
	}

	return res.status(200).json({ data: book });
};

export const updateBook = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, authors, image, publishedDate, description } = req.body;

	const book = await Book.findOne({ _id: id });

	if (!book) {
		return res.status(404).json({ message: `Book with id "${id}" not found.` });
	}

	if (!name || !authors || !image || !publishedDate || !description) {
		return res.status(422).json({
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

	return res.status(200).json({ data: bookUpdated });
};

export const deleteBook = async (req: Request, res: Response) => {
	const { id } = req.params;

	await Book.findByIdAndDelete(id);

	return res.status(200).json({ message: 'Book deleted successfully.' });
};
