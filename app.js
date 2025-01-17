const express = require('express');
const movies = require('./movies.json');
const crypto = require('node:crypto');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');

const app = express();

app.disable('x-powered-by');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Todas las peliculas
app.get('/movies', (req, res) => {
    res.header('access-control-allow-origin', 'http://localhost:65409');
    const { genre } = req.query;
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()) );
        return res.json(filteredMovies);
    }
  res.json(movies);
});

//Recuperar pelicula por id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
});

//Crear pelicula
app.post('/movies', (req, res) => {

    const result = validateMovie(req.body);

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const id = crypto.randomUUID();
    const newMovie = { 
        id, 
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
});

//actializar pelicula
app.patch('/movies/:id', (req, res) => {
    const { id } = req.params;
    const result = validatePartialMovie(req.body);

    if(result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    const updatedMovie = { 
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updatedMovie;
    return res.json(updatedMovie);
});

//Eliminar pelicula
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    movies.splice(movieIndex, 1);
    res.status(204).end();
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});