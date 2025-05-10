import { Types } from 'mongoose';
import { z } from 'zod';

// Helper schema for MongoDB ObjectId
const objectIdSchema = z
  .any()
  .refine(val => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

// Address Schema
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

// User Schema
export const userRegistrationValidationSchema = z.object({
  // _id: objectIdSchema,
  clans: z.array(objectIdSchema).optional(),
  expertise: z.array(objectIdSchema).optional(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']).default('user'),
  password: z.string().min(6),
  passwordChangedAt: z.date().optional(),
  passwordUpdatedAt: z.date().optional(),
  avatar: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  contactNo: z.string().optional(),
  address: addressSchema.optional(),
  bio: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.date().optional(),
  status: z.enum(['free', 'premium', 'suspended']).optional(),
  createdAt: z.date().optional(),
  UpdatedAt: z.date().optional(),
  verified: z.boolean().optional(),
  isDeactivated: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  isBlocked: z.literal(false).optional(),
});

const userLoginValidationSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z
    .string({ invalid_type_error: 'Password must be string' })
    .max(20, { message: 'Password can not be more than 20 characters' }),
})

const refreshTokenValidationSchema = z.object({
  refreshToken: z.string({
    required_error: 'Refresh Token is required',
  }),
})

export const AuthValidation = {
  userRegistrationValidationSchema,
  userLoginValidationSchema,
  refreshTokenValidationSchema,
};
