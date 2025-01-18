import { movieModel } from "../models/movie.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController{
    static async getAll(req, res) {
        const { genre } = req.query;
        const movies = await movieModel.getAll({ genre });
        res.json(movies);
    }

    static async getById(req, res){
        const { id } = req.params
        const movie = await movieModel.getById(id);
        if (movie) return res.json(movie)
        res.status(404).json({ message: 'Movie not found' })
    }

    static async create(req, res){
        const result = validateMovie(req.body);
        if(result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        const newMovie = await movieModel.create({ movie: result.data });
        return res.status(201).json(newMovie);
    }

    static async delete(req, res){
        const { id } = req.params;
        const result = await movieModel.delete({ id });
        if( result === false) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.json({ message: 'Movie deleted' })
    }

    static async update(req, res){
        const { id } = req.params;
        const result = validatePartialMovie(req.body);
        if(result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        const updatedMovie = await movieModel.update({ id, movie: result.data });
        return res.json(updatedMovie);
    }
}