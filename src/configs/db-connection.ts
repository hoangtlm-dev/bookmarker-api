import mongoose from 'mongoose';

mongoose.Promise = Promise;

const url = process.env.MONGODB_URL;

export const connectToDatabase = () => {
	if (!url) {
		throw new Error('MONGODB_URL is not defined');
	}

	mongoose.connect(url);

	const db = mongoose.connection;

	db.on('connected', () => {
		console.log('Connected to the database successfully!');
	});

	db.on('error', (error: Error) => {
		console.error('Failed to connect to the database:', error);
	});

	db.on('disconnected', () => {
		console.log('Disconnected from the database');
	});
};
