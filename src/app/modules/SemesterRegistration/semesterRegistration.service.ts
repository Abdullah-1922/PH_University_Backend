import httpStatus from "http-status";
import AppError from "../../Errors/AppErrors";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { SemesterRegistrationStatusConst } from "./semesterRegistration.constant";

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemesterId = payload?.academicSemester;

  //check if there any registered semester that already 'UPCOMING' | 'ONGOING'

  const isThereAnyUpcomingOrOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: SemesterRegistrationStatusConst.UPCOMING },
        {
          status: SemesterRegistrationStatusConst.ONGOING,
        },
      ],
    });
  if (isThereAnyUpcomingOrOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOrOngoingSemester.status} registered semester`
    );
  }

  //check if the semester is exist

  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemesterId);
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic Semester not found"
    );
  }
  // check is the semester is already registered

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester: academicSemesterId,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This academic Semester is already exist"
    );
  }
  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistration = async (payload: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    payload
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSemesterRegistrationById = async (id: string) => {
  const result = await SemesterRegistration.findById(id);

  return result;
};

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  //check if the semester is exist

  const isSemesterExist = await SemesterRegistration.findById(id);
  if (!isSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This  Semester not found");
  }

  const currentSemesterStatus = isSemesterExist?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === SemesterRegistrationStatusConst.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`
    );
  }

  if (currentSemesterStatus === SemesterRegistrationStatusConst.UPCOMING && requestedStatus === SemesterRegistrationStatusConst.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change directly status from ${currentSemesterStatus} to ${requestedStatus} `
    );
  }
  if (currentSemesterStatus === SemesterRegistrationStatusConst.ONGOING && requestedStatus === SemesterRegistrationStatusConst.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change directly status from ${currentSemesterStatus} to ${requestedStatus} `
    );
  }
  const result =await SemesterRegistration.findByIdAndUpdate(id,payload,{
    new:true,runValidators:true
  })
  return result
};
export const SemesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSemesterRegistrationById,
  updateSemesterRegistration,
};
