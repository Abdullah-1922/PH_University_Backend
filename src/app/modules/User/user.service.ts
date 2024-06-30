/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { StudentType } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";

import { User } from "./user.model";
import {
  generatedAdminId,
  generatedFacultyId,
  generatedStudentId,
} from "./user.utils";
import AppError from "../../Errors/AppErrors";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { Faculty } from "../Faculty/faculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Admin } from "../Admin/admin.model";

import { JwtPayload } from "jsonwebtoken";
import { sendImageTOCloudinary } from "../../utils/sendImageToCloudinary";
import { UploadApiResponse } from "cloudinary";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const crateStudentIntoDB = async (
  file: any,
  password: string,
  payload: StudentType
) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given ,use default password

  userData.password = password || "defaultPassword!!";
  userData.email = payload.email;

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

    const ImageName = `${userData.id}${payload.name.firstName}`;
    const { secure_url } = (await sendImageTOCloudinary(
      ImageName,
      file.path
    )) as UploadApiResponse;

    //set Image to payload

    payload.profileImg = secure_url;

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

const createFacultyIntoDb = async (
  file: any,
  password: string,
  payload: TFaculty
) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given ,use default password

  userData.password = password || "defaultPassword!!";

  //set student role
  userData.role = "faculty";
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated Id

    userData.id = await generatedFacultyId();

    //create a user (transaction-1)

    const ImageName = `${userData.id}${payload.name.firstName}`;
    const { secure_url } = (await sendImageTOCloudinary(
      ImageName,
      file.path
    )) as UploadApiResponse;

    //set Image to payload

    payload.profileImg = secure_url;

    const newUser = await User.create([userData], { session });

    //create a faculty

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    //set id ans  _id as user

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    // create a student (transaction-2)
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }
    await session.commitTransaction();
    session.endSession();

    return newFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to create user");
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || "defaultPass";

  //set student role
  userData.role = "admin";
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generatedAdminId();

    const ImageName = `${userData.id}${payload.name.firstName}`;
    const { secure_url } = (await sendImageTOCloudinary(
      ImageName,
      file.path
    )) as UploadApiResponse;

    //set Image to payload

    payload.profileImg = secure_url;

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (decoded: JwtPayload) => {
  const { userId, role } = decoded;
  let result = null;
  if (role == "student") {
    result = await Student.findOne({ id: userId }).populate("user");
  }
  if (role == "admin") {
    result = await Admin.findOne({ id: userId }).populate("user");
  }
  if (role == "faculty") {
    result = await Faculty.findOne({ id: userId }).populate("user");
  }

  return result;
};
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  return result;
};
export const UserService = {
  crateStudentIntoDB,
  createFacultyIntoDb,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
