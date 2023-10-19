import z from 'zod'

const bookSchema = z.object({
  isbn: z.number().int().positive(),
  title: z.string({
    invalid_type_error: 'Book title must be a string',
    required_error: 'Book title is required.'
  }),
  year: z.number().int(),
  author: z.string(),
  pages: z.number().int().positive(),
  price: z.number().positive(),
  image: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  category: z.array(
    z.enum(['Ficcion', 'Aventura', 'Crimen', 'Comedia', 'Drama', 'Fantasia', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Category is required.',
      invalid_type_error: 'Category must be an array of enum Genre'
    }
  ),
  publisher: z.number().int(),
  language: z.string(),
  description: z.string()
})

export function validateBook (input) {
  return bookSchema.safeParse(input)
}

export function validatePartialBook (input) {
  return bookSchema.partial().safeParse(input)
}
