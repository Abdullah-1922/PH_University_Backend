import httpStatus from "http-status";
import AppError from "../../Errors/AppErrors";
import { SemesterRegistration } from "../SemesterRegistration/semesterRegistration.model";

import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import mongoose from "mongoose";
import { hasTimeConflict } from "./offeredCourse.utils";
import { TOfferedCourse } from "./offeredCourse.interface";

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  // check if the semester registration id is exist

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester registration not found");
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found");
  }
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic department not found");
  }
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found");
  }

  //check if the department belong to the faculty

  // const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({academicFaculty:academicFaculty,academicDepartment:academicDepartment})
  // if (!isDepartmentBelongToFaculty) {
  //   throw new AppError(httpStatus.NOT_FOUND, "This department dose belongs to the department");
  // }

  const academicFacultyId = new mongoose.Types.ObjectId(academicFaculty);

  if (!isAcademicDepartmentExists.academicFaculty.equals(academicFacultyId)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This department dose belongs to the department"
    );
  }
  //check if the same course  same section in registered semester exists

  const isSameOfferedCourseExistWitSameRegisteredSemesterWithSection =
    await OfferedCourse.findOne({ semesterRegistration, course, section });
  if (isSameOfferedCourseExistWitSameRegisteredSemesterWithSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Offered course wit same section is already exist"
    );
  }

  //get the schedules of the faculties

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");
  // console.log(assignedSchedules);

  const newSchedule = { days, startTime, endTime };
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "this faculty is no available at that time"
    );
  }

  const result = OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCourse = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "endTime" | "startTime">
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found");
  }

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterStatus =
    await SemesterRegistration.findById(semesterRegistration);
  console.log(semesterStatus);
  if (semesterStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterStatus?.status}`
    );
  }

  //get the schedules of the faculties

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");
  // console.log(assignedSchedules);

  const newSchedule = { days, startTime, endTime };
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "this faculty is no available at that time"
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};


const getAllOfferedCourse=async()=>{
  const result  = await OfferedCourse.find({})
  return result
}


const getOfferedCourseById=async(id:string)=>{
  const result = await OfferedCourse.findById(id)
  return result
}


const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};


export const OfferedCourseServices = {
  createOfferedCourseIntoDb,
  updateOfferedCourse,
  getAllOfferedCourse,
  getOfferedCourseById,
  deleteOfferedCourseFromDB
};
