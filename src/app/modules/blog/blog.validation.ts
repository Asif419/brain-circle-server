import { Types } from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z
  .any()
  .refine(val => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const createBlogValidationSchema = z.object({
  body: z.object({
    author: objectIdSchema,
    coAuthors: z.array(objectIdSchema).optional(),
    expertise: z.array(objectIdSchema),
    clan: z.array(objectIdSchema).optional(),
    title: z.string().min(3),
    slug: z.string().min(3),
    content: z.array(z.string()).nonempty(),
    published: z.boolean().optional(),
    tags: z.string().optional(),
    readTime: z.number().min(1),
    isHidden: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    isBlocked: z.boolean().optional(),
  }),
});

export const updateBlogValidationSchema = z.object({
  body: z.object({
    author: objectIdSchema.optional(),
    coAuthors: z.array(objectIdSchema).optional(),
    expertise: z.array(objectIdSchema).optional(),
    clan: z.array(objectIdSchema).optional(),
    title: z.string().min(3).optional(),
    slug: z.string().min(3).optional(),
    content: z.array(z.string()).optional(),
    published: z.boolean().optional(),
    tags: z.string().optional(),
    readTime: z.number().min(1).optional(),
    isHidden: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    isBlocked: z.boolean().optional(),
  }),
});

export const blogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
