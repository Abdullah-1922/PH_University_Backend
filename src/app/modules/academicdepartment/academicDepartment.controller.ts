import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AcademicDepartment is created successfully",
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All AcademicDepartment get Successfully",
    data: result,
  });
});
const getAcademicDepartmentById = catchAsync(async (req, res) => {
  const id = req.params.departmentId;
  const result = await AcademicDepartmentServices.getAcademicDepartmentByID(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AcademicDepartment get Successfully",
    data: result,
  });
});
const updateAcademicDepartmentById = catchAsync(async (req, res) => {
  const id = req.params.departmentId;
  const name: string = req.body.name;

  const data = {
    id,
    name,
  };
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentByID(data);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AcademicDepartment updated Successfully",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartmentById,
};
