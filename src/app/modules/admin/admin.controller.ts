import httpStatus from 'http-status';
import catchAsync from '../../utils/cathAsync';
import sendResponse from '../../utils/sendResponse';
import { adminService } from './admin.service';
import { TParams } from './admin.interface';

const blockUser = catchAsync(async (req, res) => {
  const result = await adminService.blockUserInDB(req.params as TParams);

  sendResponse(res, {
    success: true,
    message: result.message,
    statusCode: httpStatus.OK,
    data: result.result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await adminService.deleteBlogFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const adminController = {
  blockUser,
  deleteBlog,
};
