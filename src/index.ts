import bodyParser from 'body-parser';
import { publicRouter } from './router';
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';

const app = express();
var port = process.env.PORT || 8080
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', publicRouter)

app.listen(port, () => console.log(`Hello world app listening on port 8080!`));