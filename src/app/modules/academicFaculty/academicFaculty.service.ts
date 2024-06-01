import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

//get all AcademicFaculty
const getAllAcademicFacultiesFromDB = async () => {
  const result = AcademicFaculty.find({});
  return result;
};
const getAcademicFacultyByID = async (payload: string) => {
  const result = AcademicFaculty.findById(payload);
  return result;
};

const updateAcademicFacultyByID = async (payload: {
  id: string;
  name: string;
}) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: payload.id },
    { $set: { name: payload.name } },
    {
      new: true,
    }
  );
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getAcademicFacultyByID,
  updateAcademicFacultyByID,
};
