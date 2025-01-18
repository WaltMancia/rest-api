import express, { json } from 'express';
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();

app.disable('x-powered-by');

app.use(json());
app.use(corsMiddleware());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/movies', moviesRouter);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});