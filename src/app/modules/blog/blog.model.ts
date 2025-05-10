import { model, Schema } from 'mongoose';
import { BlogModel, TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coAuthors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    expertise: [{ type: Schema.Types.ObjectId, ref: 'Expertise' }],
    clan: [{ type: Schema.Types.ObjectId, ref: 'Clan' }],
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: [{ type: String }],
    published: { type: Boolean, default: false },
    tags: { type: String },
    readTime: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


blogSchema.statics.isBlogExistsById = async function (id: string) {
  return await Blog.findById(id);
};

export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
