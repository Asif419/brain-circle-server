import { Model, Types } from 'mongoose';

export interface TBlog {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  coAuthors?: Types.ObjectId[];
  expertise?: Types.ObjectId[];
  clan?: Types.ObjectId[];
  title: string;
  slug?: string;
  content: string[];
  published: boolean;
  tags?: string;
  readTime?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isHidden?: boolean;
  isDeleted?: boolean;
  isBlocked?: boolean;
}
export interface BlogModel extends Model<TBlog> {
  isBlogExistsById(id: string): Promise<TBlog>;
}
