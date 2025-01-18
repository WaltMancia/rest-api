import { randomUUID } from 'crypto';
import movies from '../movies.json' with {type: 'json'};

export class movieModel{
    static async getAll ({ genre }) {
        if(genre){
            return movies.filter(
             movie => movie.genre.some (g => g.toLowerCase() === genre.toLowerCase())
            );
        }
        return movies;
    }

    static async getById(id){
        return movies.find(movie => movie.id === id);
    }

    static async create({ movie }){
        const newMovie = {
            id: randomUUID(),
            ...movie
        }
        movies.push(newMovie);
        return newMovie;
    }

    static async delete({ id }){
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) {
            return false;
        }
        return true;
    }

    static async update({ id, movie }){
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) {
            throw new Error('Movie not found');
        }
        const updatedMovie = { 
            ...movies[movieIndex],
            ...movie
        }
        movies[movieIndex] = updatedMovie;
        return updatedMovie;
    }
}