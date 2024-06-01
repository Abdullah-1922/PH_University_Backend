import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";
import { AcademicSemesterServices } from "./academicSemester.service";
import { TAcademicSemester } from "./academicSemester.interface";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AcademicSemester is created successfully",
    data: result,
  });
});

const getAllSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemester();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Semester get Successfully",
    data: result,
  });
});
const getSemesterById = catchAsync(async (req, res) => {
  const id = req.params.semesterId;
  const result = await AcademicSemesterServices.getSemesterByID(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester get Successfully",
    data: result,
  });
});
const updateSemesterById = catchAsync(async (req, res) => {
  const id = req.params.semesterId;
  const body: TAcademicSemester = req.body;
  const data = {
    id,
    body,
  };
  const result = await AcademicSemesterServices.UpdateSemesterByID(data);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester updated Successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllSemester,
  getSemesterById,
  updateSemesterById
};
