import { User } from "./user.model";

const getSingleUserFromDB = async (id: string) => {
    const result = await User.findById(id)
    // need to: remove those lines
    //   .populate('admissionSemester')
    //   .populate({
    //     path: 'academicDepartment',
    //     populate: {
    //       path: 'academicFaculty',
    //     },
    //   });
    return result;
  };

  export const UserServices = {
    getSingleUserFromDB
  };