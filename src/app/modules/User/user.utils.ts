import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async (year: string, code: string) => {
  const lastStudent = await User.findOne(
    { role: "student", id: { $regex: `${year}${code}` } },
    { id: 1, _id: 0 },
    { sort: { createdAt: -1 } }
  ).lean();

  return lastStudent?.id ? lastStudent.id : null;
};

// year semesterCode 4 digit code
export const generatedStudentId = async (payload: TAcademicSemester) => {
  //first time 0000

  let currentId = (0).toString(); // 0000 by default

  const lastStudentId = await findLastStudentId(payload.year, payload.code);
  // 2030 01 0001
  // if (lastStudentId) {
  //   const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  //   const lastStudentSemesterYear = lastStudentId?.substring(0, 4); //2030
  //   const currentSemesterCode = payload.code;
  //   const currentStudentYear = payload.year;
  //   if (
  //     lastStudentId &&
  //     lastStudentSemesterCode === currentSemesterCode &&
  //     lastStudentSemesterYear === currentStudentYear
  //   ) {
  //     currentId = lastStudentId.substring(6);
  //   }
  // }
  if (lastStudentId) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

export const generatedFacultyId = async () => {
  let facultyId = (0).toString();

  const IsFacultyExist = await User.findOne(
    { role: "faculty" },
    { id: 1, _id: 0 },
    { sort: { createdAt: -1 } }
  );
  console.log(IsFacultyExist);
  if (IsFacultyExist) {
    const currentFacultyId = IsFacultyExist.id.split("-")[1];

    facultyId = (Number(currentFacultyId) + 1).toString().padStart(4, "0");
    console.log(facultyId);
  } else {
    facultyId = (Number(facultyId) + 1).toString().padStart(4, "0");
  }

  return `F-${facultyId}`;
};
export const generatedAdminId = async () => {
  let adminId = (0).toString();

  const IsAdminExist = await User.findOne(
    { role: "admin" },
    { id: 1, _id: 0 },
    { sort: { createdAt: -1 } }
  );
  console.log(IsAdminExist);
  if (IsAdminExist) {
    const currentFacultyId = IsAdminExist.id.split("-")[1];

    adminId = (Number(currentFacultyId) + 1).toString().padStart(4, "0");
    
  } else {
    adminId = (Number(adminId) + 1).toString().padStart(4, "0");
  }

  return `A-${adminId}`;
};
