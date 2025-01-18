import z from 'zod';

const movieSchema = z.object({
        title: z.string({
            invalid_type_error: 'Title must be a string',
            invalid_length_error: 'Title must be between 1 and 255 characters',
            invalid_value_error: 'Title must not be empty',
        }),
        year: z.number().int().min(1900).max(2025),
        director: z.string(),
        duration: z.number().int().min(1).max(500),
        poster: z.string().url({
            message: 'Poster must be a valid URL',
        }),
        genre: z.array(z.string()),
        rating: z.number().min(0).max(10).optional(),
});

export function validateMovie(movie) {
    return movieSchema.safeParse(movie);
}

export function validatePartialMovie(input) {
    return movieSchema.partial().safeParse(input);
}