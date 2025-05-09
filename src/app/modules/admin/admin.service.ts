import AppError from '../../error/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';
import { TParams } from './admin.interface';
import httpStatus from 'http-status';

const blockUserInDB = async (params: TParams) => {
  const { userId, status } = params;

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!['block', 'unblock'].includes(status)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid status. Use "block" or "unblock".',
    );
  }

  const previousDataOfUser = await User.findById(userId);

  if (previousDataOfUser?.isBlocked === (status === 'block')) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'No changes detected. User is already in the requested state.',
    );
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { $set: { isBlocked: status === 'block' ? true : false } },
    { new: true, runValidators: true },
  );

  return {
    result,
    message: `User ${status}ed successfully`,
  };
};

const deleteBlogFromDB = async (params: string) => {
  const id = params;

  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  const result = await Blog.deleteOne({ _id: id });
  if (result.deletedCount <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Able to delete the blog');
  }

  return result;
};

export const adminService = {
  blockUserInDB,
  deleteBlogFromDB,
};
