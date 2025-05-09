import catchAsync from '../utils/cathAsync';
import { User } from '../modules/user/user.model';
import AppError from '../error/AppError';
import httpStatus from 'http-status';
import { Blog } from '../modules/blog/blog.model';

const verifyOwnershipOrRole = catchAsync(async (req, res, next) => {
  const blogId = req.params.id;
  const userEmail = req.user.userEmail;

  const BlogDataFromDB = await Blog.isBlogExistsById(blogId);
  const userDataFromDB = await User.userExistenceCheckingByEmail(userEmail);

  if (!BlogDataFromDB) {
    throw new AppError(httpStatus.NOT_FOUND, 'The blog is not found');
  } else if (!userDataFromDB) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'The user is not found');
  } else if (!BlogDataFromDB.author.equals(userDataFromDB._id)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Unauthorized: You are not the owner of this blog',
    );  
  }
  // else if (userDataFromDB.role !== 'admin') {
  //   throw new AppError(
  //     httpStatus.UNAUTHORIZED,
  //     'Unauthorized: You are not able to delete this blog',
  //   );
  // }

  next();
});

export default verifyOwnershipOrRole;
