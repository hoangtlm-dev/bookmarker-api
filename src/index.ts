import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

import { connectToDatabase } from './configs';
import { bookRoute } from './routes';

const app = express();

app.use(
	cors({
		credentials: true
	})
);

app.use(compression());
app.use(bodyParser.json());

connectToDatabase();

app.use('/', bookRoute());

const server = http.createServer(app);

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
