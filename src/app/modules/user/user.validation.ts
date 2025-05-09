import { z } from 'zod';

const updateUserRegistrationValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email('Invalid email format')
      .min(1, 'Email is required')
      .optional(),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().optional(),
  }),
});

export const userValidation = {
  updateUserRegistrationValidationSchema,
};
