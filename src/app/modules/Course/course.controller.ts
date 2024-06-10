import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncHandler";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourse(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is created successfully",
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourse(req.query);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Course retrieved Successfully",
    data: result,
  });
});
const getCourseById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.getCourseById(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course retrieved Successfully",
    data: result,
  });
});
const deleteCourseById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await CourseServices.deleteCourseById(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course delete Successfully",
    data: result,
  });
});

const updateCourseById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await CourseServices.updateCourseById(id, req.body);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course updated Successfully",
    data: result,
  });
});
const assignFacultiesIntoCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesIntoCourse(
    courseId,
    faculties
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties assign Successfully",
    data: result,
  });
});
const removeFacultiesIntoCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesIntoCourse(
    courseId,
    faculties
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties removed Successfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById,
  assignFacultiesIntoCourse,
  removeFacultiesIntoCourse
};
