import { Request, Response } from "express";
import catchAsync from "../../utils/asyncHandler";
import { SemesterRegistrationService } from "./semesterRegistration.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.createSemesterRegistration(
      req.body
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "SemesterRegistration Created Successfully",
      data: result,
    });
  }
);
const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.getAllSemesterRegistration(
      req.query
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "SemesterRegistration retrieved Successfully",
      data: result,
    });
  }
);
const getSemesterRegistrationById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.getSemesterRegistrationById(id);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "SemesterRegistration retrieved Successfully",
      data: result,
    });
  }
);
const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.updateSemesterRegistration(
      id,
      req.body
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "SemesterRegistration updated Successfully",
      data: result,
    });
  }
);
const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    
    const { id } = req.params;
    const result = await SemesterRegistrationService.deleteSemesterRegistrationFromDB(
      id
   
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "SemesterRegistration Deleted Successfully",
      data: result,
    });
  }
);
export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSemesterRegistrationById,
  updateSemesterRegistration,
  deleteSemesterRegistration
};
