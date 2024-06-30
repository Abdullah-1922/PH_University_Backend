/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  email:string;
  passwordChangeAt?:Date
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};



export type TUserRole=keyof typeof USER_ROLE

export interface UserModel extends Model<TUser> {
  // myStaticMethod():number
  isUserExistsByCustomId(id:string):Promise<TUser>;
  isPasswordMatched(plainTextPassword:string,hashedPassword:string):Promise<boolean>;
  isJWTIssuedBeforePasswordChange(passwordChangeTimestamp:Date,jwtTimeStamp:number):boolean
}

