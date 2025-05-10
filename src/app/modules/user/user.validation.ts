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
  body: z.object({
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
    isDeactivated: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    isBlocked: z.boolean().optional(),
    clans: z.array(objectIdSchema).optional(),
    expertise: z.array(objectIdSchema).optional(),
  }).strict()
})


export const changeUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['free', 'premium', 'suspended'], {
      required_error: 'Status is required',
      invalid_type_error: 'Status must be one of: free, premium, suspended',
    }),
  }),
  params: z.object({
    id: z.string().min(1, 'User ID is required'),
  }),
});


export const UserValidation = {
  userUpdateValidationSchema,
  changeUserStatusValidationSchema,
};
