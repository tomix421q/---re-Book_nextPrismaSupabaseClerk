import * as z from 'zod'
import { ZodSchema } from 'zod'

export const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
})

export const imageSchema = z.object({
  image: validateFile(),
})

export const bookSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'name must be at least 2 characters.' })
    .max(80, { message: 'name must be less than 80 characters' }),
  tagline: z
    .string()
    .min(2, { message: 'Tagline must be at least 2 characters.' })
    .max(100, { message: 'tagline must be less than 100 characters.' }),
  price: z.coerce.number().int().min(0, { message: 'price must be a positive number' }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length
      return wordCount >= 10 && wordCount <= 1000
    },
    { message: 'Description must be between 10 and 1000 words.' }
  ),
  damage: z.string(),
})

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)
    throw new Error(errors.join(', '))
  }

  return result.data
}

function validateFile() {
  const maxUploadSize = 1024 * 1024
  const acceptedFileTypes = ['image/']

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize
    }, `File size must be less than 1MB`)
    .refine((file) => {
      return !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
    }, 'File must be an image')
}

// validate review schema
export const createReviewSchema = z.object({
  bookId: z.string(),
  comment: z.string().min(10).max(1000),
})

// order schema
export const orderSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(80, { message: 'Name must be less than 80 characters.' }),

  email: z.string().email({ message: 'Invalid email address.' }),

  adress: z
    .string()
    .min(10, { message: 'Address must be at least 10 characters.' })
    .max(100, { message: 'Address must be less than 100 characters.' }),
})
