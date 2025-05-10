import catchAsync from "../../utils/cathAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { UserServices } from "./user.services";

const getSingleUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userUpdateData = req.body;
  const result = await UserServices.updateUserIntoDB(id, userUpdateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const activateUser = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await UserServices.activateUserIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User activated successfully',
    data: result,
  });
})

const deactivateUser = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await UserServices.deactivateUserIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deactivated successfully',
    data: result,
  });
})


export const UserController = {
  getSingleUserById,
  updateUser,
  activateUser,
  deactivateUser,
}
