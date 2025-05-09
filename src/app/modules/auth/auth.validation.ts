import { z } from 'zod';

const userRegistrationValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z
      .string({ invalid_type_error: 'Password must be string' })
      .max(20, { message: 'Password can not be more than 20 characters' }),
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z
      .string({ invalid_type_error: 'Password must be string' })
      .max(20, { message: 'Password can not be more than 20 characters' }),
  }),
});

export const authValidation = {
  userRegistrationValidationSchema,
  userLoginValidationSchema,
};
