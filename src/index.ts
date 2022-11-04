import bodyParser from 'body-parser';
import express from 'express';
import { publicRouter } from './router';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', publicRouter)

app.listen(PORT, () => console.log(`Hello world app listening on port 3004!`));