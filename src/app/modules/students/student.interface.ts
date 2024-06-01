// import { Schema, model, connect } from "mongoose";
import { Model, Types } from "mongoose";
// import { Student } from "./student.model";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  MotherName: string;
  MotherOccupation: string;
  MotherContactNo: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type StudentType = {
  id: string;
  user: Types.ObjectId;

  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment:Types.ObjectId
  isDeleted: boolean;
};
// for creating static

export interface StudentModel extends Model<StudentType> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(id: string): Promise<StudentType | null>;
}

// for creating instance
// export type StudentMethods = {
//   isUserExist(id:string) : Promise<StudentType | null>
// }
// export type StudentModel = Model<StudentType, Record<string, never>, StudentMethods>;
