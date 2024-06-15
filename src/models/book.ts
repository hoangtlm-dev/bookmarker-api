import mongoose, { Schema } from 'mongoose';

import { IBook } from 'types';

const bookSchema = new Schema<IBook>({
	name: { type: String, required: true },
	authors: { type: [String], required: true },
	image: { type: String, required: true },
	publishDate: { type: String, required: true },
	description: { type: String, required: true }
});

export const Book = mongoose.model('Book', bookSchema);
