import httpStatus from "http-status";
import catchAsync from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from "./faculty.service";

const getFacultyById = catchAsync(async (req, res) => {
  const id = req.params.facultyId;
  const result = await facultyServices.getFacultyById(id);

   sendResponse(
    res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Faculty retrieved successfully',
        data:result
    }
  )
});


export const facultyController={
    getFacultyById
}