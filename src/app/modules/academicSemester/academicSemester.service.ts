import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //semester name --> semesterCode

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

//get all semester
const getAllSemester = async() => {
  const result = AcademicSemester.find({});
  return result;
};
const getSemesterByID =async (payload: string) => {
  const result = AcademicSemester.findById(payload);
  return result;
};

const UpdateSemesterByID =async (payload: {
  id: string;
  body: TAcademicSemester;
}) => {
  const { id, body } = payload;

  if (academicSemesterNameCodeMapper[body.name] !== body.code) {
    throw new Error("Invalid semester code");
  }


  const isSemesterExists = await AcademicSemester.findOne({
    _id:{$ne:id},
    name: body.name,
    year: body.year,
  });
  if(isSemesterExists){
    throw new Error('Semester is already exist !')
  }


  const result =await AcademicSemester.findOneAndUpdate({_id:id}, body,{new:true});
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllSemester,
  getSemesterByID,
  UpdateSemesterByID,
};
