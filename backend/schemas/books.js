import z from 'zod'

const bookSchema = z.object({
  isbn: z.string(),
  title: z.string({
    invalid_type_error: 'Book title must be a string',
    required_error: 'Book title is required.'
  }),
  year: z.number().int(),
  author: z.string(),
  image: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  price: z.number().positive(),
  category: z.string(),
  publisher: z.number().int(),
  cover: z.string(),
  pages: z.number().int().positive(),
  language: z.string(),
  description: z.string(),
  stock: z.number().int().positive()
})

export function validateBook (input) {
  return bookSchema.safeParse(input)
}

export function validatePartialBook (input) {
  return bookSchema.partial().safeParse(input)
}
