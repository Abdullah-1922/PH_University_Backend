import mongoose from "mongoose";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { StudentType } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";

import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";
import AppError from "../../Errors/AppErrors";
import httpStatus from "http-status";

const crateStudentIntoDB = async (password: string, payload: StudentType) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given ,use default password

  userData.password = password || "defaultPassword!!";

  //set student role
  userData.role = "student";

  //find Academic Semester info

  const UserAcademicSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set manually generated Id

    userData.id = await generatedStudentId(
      UserAcademicSemester as TAcademicSemester
    );

    //create a user (transaction-1)

    const newUser = await User.create([userData], { session });

    //create a student

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    //set id ans  _id as user

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }
    await session.commitTransaction();
    session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create user");
  }
};
export const UserService = {
  crateStudentIntoDB,
};
