import z from 'zod'

const userSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
  role: z.string()
})

export function validateUser (input) {
  const result = userSchema.safeParse(input);

  if(!result.success) {
    console.log('Validation Errors: ', result.error)
  }
  return result
}

export function validatePartialUser (input) {
  const result = userSchema.partial().safeParse(input)

  if(!result.success) {
    console.log('Validation Errors: ', result.error)
  }
  return result
}
