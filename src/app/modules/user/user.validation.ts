import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z
  .any()
  .refine(val => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
}).optional();

export const userUpdateValidationSchema = z.object({
  name: z.string().optional(),
  role: z.enum(['admin', 'user']).optional(),
  avatar: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  contactNo: z.string().optional(),
  address: addressSchema,
  bio: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
  status: z.enum(['free', 'premium', 'suspended']).optional(),
  verified: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  clans: z.array(objectIdSchema).optional(),
  expertise: z.array(objectIdSchema).optional(),
}).strict();


export const UserValidation = {
  userUpdateValidationSchema,
};
