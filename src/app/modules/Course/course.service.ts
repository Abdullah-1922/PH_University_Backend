import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculties } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../Errors/AppErrors";
import httpStatus from "http-status";

const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourse = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourse.course"),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;

  return result;
};

const getCourseById = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourse.course"
  );

  return result;
};

const deleteCourseById = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};

const updateCourseById = async (id: string, payload: Partial<TCourse>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid course ID format");
  }

  const { preRequisiteCourse, ...courseRemainingData } = payload;

  if (preRequisiteCourse && preRequisiteCourse.length > 0) {
    //filter out the deleted fields
    const courseIds = preRequisiteCourse
      .filter((el) => el.course)
      .map((el) => el.course);

    const checkCourseId = await Course.find({ _id: { $in: courseIds } });
    if (checkCourseId.length !== courseIds.length) {
      throw new AppError(404, "One or more course IDs are invalid");
    }
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //step-1 : basic course info updateI am here
    const updateBAsicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session }
    );

    if (!updateBAsicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to update Course");
    }
    //check if there is any preRequisiteCourse in payload

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      //filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true, session }
      );
      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "failed to update Course");
      }
      //filter out the new course fields

      const newPreRequisites = preRequisiteCourse.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourse: {
              $each: newPreRequisites,
            },
          },
        },
        { new: true, runValidators: true, session }
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "failed to update Course");
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = Course.findById(id).populate("preRequisiteCourse.course");

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    return err;
  }
};

const assignFacultiesIntoCourse = async (
  id: string,
  payload: Partial<TCourseFaculties>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );

  return result;
};

const removeFacultiesIntoCourse = async (
  id: string,
  payload: Partial<TCourseFaculties>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    }
  );

  return result;
};

export const CourseServices = {
  createCourse,
  getAllCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById,
  assignFacultiesIntoCourse,
  removeFacultiesIntoCourse,
};
