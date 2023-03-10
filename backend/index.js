import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import cookie from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';
import Router from './Routes/index.js';
import db from './Config/mongoose.js';

const app = express();

dotenv.config();
const port = process.env.port || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setting body req and respose
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// setting path of static files assets
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

// protection from http header attack
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// accessing logger for every request made of server
app.use(logger('common'));

app.use('/', Router);

app.listen(port, function (err) {
	if (err) {
		console.log(`Error in running a server: ${err}`);
		return;
	}
	console.log(`Server is running on port: ${port}`);
});
