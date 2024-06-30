import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { UserStatus } from "./user.constant";

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    email:{type:String,required:true,unique:true},
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeAt: { type: Date },
    role: { type: String, enum: ["admin", "student", "faculty"] },
    status: {
      type: String,
      enum:UserStatus ,
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //doc

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//  set empty string to password
userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id) {
  return await User.findOne({ id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChange=function(passwordChangeTimestamp:Date,jwtTimeStamp:number){
// return passwordChangeTimestamp >jwtTimeStamp
const passwordChangeTime =new Date(passwordChangeTimestamp).getTime() /1000
return passwordChangeTime >jwtTimeStamp
}



export const User = model<TUser, UserModel>("User", userSchema);
