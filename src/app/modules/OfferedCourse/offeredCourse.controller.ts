import { Request, Response } from "express";
import catchAsync from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OfferedCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDb(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is created Successfully !",
    data: result,
  });
});
const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
      const result = await OfferedCourseServices.getAllOfferedCourse()
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourses retrieved successfully !',
        data: result,
      });
  });
  
  const getSingleOfferedCourses = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
        const result = await OfferedCourseServices.getOfferedCourseById(id)
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'OfferedCourse fetched successfully',
          data: result,
        });
    },
  );






const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
const {id}=req.params

  const result = await OfferedCourseServices.updateOfferedCourse(id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is updated Successfully !",
    data: result,
  });
});


const deleteOfferedCourseFromDB = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourse deleted successfully',
        data: result,
      });
    },
  );



export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getSingleOfferedCourses,
  getAllOfferedCourses,
  deleteOfferedCourseFromDB
};
