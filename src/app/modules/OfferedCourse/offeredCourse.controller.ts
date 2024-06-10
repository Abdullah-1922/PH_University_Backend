import { Request, Response } from "express";
import catchAsync from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OfferedCourseServices } from "./offeredCourse.service";



const createOfferedCourse =catchAsync(
async(req:Request,res:Response)=>{
const result = await OfferedCourseServices.createOfferedCourseIntoDb(req.body)
sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Offered Course is created Successfully !",
    data:result
})


}

)

export const OfferedCourseControllers={
     createOfferedCourse
}

