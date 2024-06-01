import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";

import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AcademicFaculty is created successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All AcademicFaculty get Successfully",
    data: result,
  });
});
const getAcademicFacultyById = catchAsync(async (req, res) => {
  const id = req.params.facultyId;
  const result = await AcademicFacultyServices.getAcademicFacultyByID(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AcademicFaculty get Successfully",
    data: result,
  });
});
const updateAcademicFacultyById = catchAsync(async (req, res) => {
  const id = req.params.facultyId;
  const name: string = req.body.name;

  const data = {
    id,
    name,
  };
  const result = await AcademicFacultyServices.updateAcademicFacultyByID(data);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AcademicFaculty updated Successfully",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty: getAllAcademicFaculties,
  getAcademicFacultyById,
  updateAcademicFacultyById,
};
