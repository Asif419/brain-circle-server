import { TUser } from "./user.interface";
import { User } from "./user.model";

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id)
  // need to: update populate and remove those lines
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const { address, ...remainingUserData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUserData,
  };



  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const activateUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(id,
    { $set: { isDeactivated: false } },
    { new: true },
  );
  return result;
}

const deactivateUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(id,
    { $set: { isDeactivated: true } },
    { new: true },
  );
  return result;
}

export const UserServices = {
  getSingleUserFromDB,
  updateUserIntoDB,
  activateUserIntoDB,
  deactivateUserIntoDB,
};