import z from 'zod'

const categorySchema = z.object({ 
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Book title must be a string',
    required_error: 'Book title is required.'
  })
})

export function validateCategory (input) {
  return categorySchema.safeParse(input)
}

export function validatePartialCategory(input) {
  return categorySchema.partial().safeParse(input)
}