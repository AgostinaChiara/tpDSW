import z from 'zod'

const bookSchema = z.object({
  isbn: z.string(),
  title: z.string({
    invalid_type_error: 'Book title must be a string',
    required_error: 'Book title is required.'
  }),
  year: z.number().int(),
  author: z.string(),
  image: z.string(),
  price: z.number().positive(),
  category: z.string({
    message: 'Category is not a string'
  }),
  publisher: z.number().int(),
  cover: z.string(),
  pages: z.number().int().positive(),
  language: z.string(),
  description: z.string(),
  stock: z.number().int().positive()
})

export function validateBook (input) {
  const result = bookSchema.safeParse(input);

  if(!result.success) {
    console.log('Validation Errors: ', result.error)
  }
  return result
}

export function validatePartialBook (input) {
  const result = bookSchema.partial().safeParse(input)

  if(!result.success) {
    console.log('Validation Errors: ', result.error)
  }
  return result
}
