import { z } from "zod";

// UserName Zod schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(10, "FirstName cannot be more than 10 characters")
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim(),
});

// Guardian Zod schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string().trim(),
  MotherName: z.string().trim(),
  MotherOccupation: z.string().trim(),
  MotherContactNo: z.string().trim(),
});

// LocalGuardian Zod schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  address: z.string().trim(),
});
const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
// StudentType Zod schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Invalid email address"),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(bloodGroup as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      // profileImg: z.string().optional(),
      academicDepartment: z.string(),
      admissionSemester: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(10, "FirstName cannot be more than 10 characters")
    .trim()
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().trim().optional(),
  fatherContactNo: z.string().trim().optional(),
  motherName: z.string().trim().optional(), // Changed "MotherName" to "motherName" for consistency
  motherOccupation: z.string().trim().optional(), // Changed "MotherOccupation" to "motherOccupation"
  motherContactNo: z.string().trim().optional(), // Changed "MotherContactNo" to "motherContactNo"
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  contactNo: z.string().trim().optional(),
  address: z.string().trim().optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Invalid email address").optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(bloodGroup as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
      admissionSemester: z.string().optional(),
    }),
  }),
});
export const studentValidationSchemas = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
