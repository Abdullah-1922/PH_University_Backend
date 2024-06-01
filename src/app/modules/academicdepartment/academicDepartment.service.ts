import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

//get all AcademicFaculty
const getAllAcademicDepartmentFromDB = async () => {
  const result = AcademicDepartment.find({}).populate("academicFaculty");
  return result;
};
const getAcademicDepartmentByID = async (payload: string) => {
  const result = AcademicDepartment.findById(payload);
  return result;
};

const updateAcademicDepartmentByID = async (payload: {
  id: string;
  name: string;
}) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: payload.id },
    { $set: { name: payload.name } },
    {
      new: true,
    }
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getAcademicDepartmentByID,
  updateAcademicDepartmentByID,
};
