import { JwtPayload } from 'jsonwebtoken';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../user/user.model';
import { Types } from 'mongoose';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogsSearchableFields } from './blog.constant';

const createBlogIntoDB = async (payload: TBlog, jwtPayload: JwtPayload) => {
  const userInformation = await User.userExistenceCheckingByEmail(
    jwtPayload.userEmail,
  );

  const convertedUserIDToString: string = new Types.ObjectId(
    userInformation._id,
  ).toString();

  const blogData = { ...payload, author: convertedUserIDToString };
  const createdBlog = await Blog.create(blogData);
  const result = await Blog.findById(createdBlog._id)
    .select('-isPublished')
    .populate({
      path: 'author',
      select: 'name email',
    });

  return result;
};

const updateBlogIntoDB = async (payload: Partial<TBlog>, id: string) => {
  const result = await Blog.findByIdAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true },
  )
    .select('-isPublished')
    .populate({
      path: 'author',
      select: 'name email',
    });

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.deleteOne({ _id: id });
  if (result.deletedCount <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Able to delete the blog');
  }

  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(
    Blog.find().populate({
      path: 'author',
      select: 'name email',
    }),
    query,
  )
    .search(blogsSearchableFields)
    .filter()
    .sortBy()
    .paginate()
    .fields();

  const result = await blogsQuery.modelQuery;
  return result;
};

export const blogServer = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
