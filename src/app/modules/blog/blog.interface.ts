import { Model, Types } from 'mongoose';

export interface TBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished?: boolean;
}

export interface BlogModel extends Model<TBlog> {
  isBlogExistsById(id: string): Promise<TBlog>;
}
