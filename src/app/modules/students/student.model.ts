import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  // StudentMethods,
  StudentModel,
  StudentType,
  TUserName,
} from "./student.interface";

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      maxlength: [10, "FirstName can not be more than 10 characters"],
      trim: true,
    },
    middleName: { type: String, trim: true },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
  },
  { _id: false }
);

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: { type: String, required: [true, "Father's name is required"] },
    fatherOccupation: {
      type: String,
      required: [true, "Father's occupation is required"],
    },
    fatherContactNo: {
      type: String,
      required: [true, "Father's contact number is required"],
    },
    MotherName: { type: String, required: [true, "Mother's name is required"] },
    MotherOccupation: {
      type: String,
      required: [true, "Mother's occupation is required"],
    },
    MotherContactNo: {
      type: String,
      required: [true, "Mother's contact number is required"],
    },
  },
  { _id: false }
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: {
      type: String,
      required: [true, "Local guardian's name is required"],
    },
    occupation: {
      type: String,
      required: [true, "Local guardian's occupation is required"],
    },
    contactNo: {
      type: String,
      required: [true, "Local guardian's contact number is required"],
    },
    address: {
      type: String,
      required: [true, "Local guardian's address is required"],
    },
  },
  { _id: false }
);

const studentSchema = new Schema<StudentType, StudentModel>(
  {
    id: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id required"],
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: [true, "Student's name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not an acceptable gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
    },
    email: { type: String, required: [true, "Email is required"] },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not a valid blood group",
      },
      required: [true, "Blood group is required"],
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian details are required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian details are required"],
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//virtual

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// Query middleware

studentSchema.pre("find", function (next) {
  // console.log('from this',this);
  this.find({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre("findOne", function (next) {
  // console.log('from this',this);
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

//creating a custom method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<StudentType, StudentModel>(
  "Student",
  studentSchema
);
