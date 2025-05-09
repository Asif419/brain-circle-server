import { model, Schema } from 'mongoose';
import { BlogModel, TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog, BlogModel>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.statics.isBlogExistsById = async function (id: string) {
  return await Blog.findById(id);
};

export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
