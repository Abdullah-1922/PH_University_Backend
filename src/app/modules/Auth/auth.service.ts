import httpStatus from "http-status";
import AppError from "../../Errors/AppErrors";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exist

  const user = await User.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }
  //   //check if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ");
  }
  //check if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ");
  }

  //check if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched ");
  }

  //   //Access Granted: Send AccessToken,RefreshToken

  // create token and send to the client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.isUserExistsByCustomId(userData.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
  }
  //   //check if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ");
  }
  //check if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ");
  }

  //check if the password is correct

  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched ");
  }
  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );

  return null;
};

const refreshToken=async(token:string)=>{



//check if the token is valid

const decode = jwt.verify(
  token,
  config.jwt_refresh_secret as string
) as JwtPayload;
const {  userId, iat } = decode;

const user = await User.isUserExistsByCustomId(userId);
if (!user) {
  throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
}
//   //check if the user is already deleted
const isDeleted = user?.isDeleted;

if (isDeleted) {
  throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ");
}
//check if the user is blocked
const userStatus = user?.status;

if (userStatus === "blocked") {
  throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ");
}

if (
  user.passwordChangeAt &&
  User.isJWTIssuedBeforePasswordChange(user.passwordChangeAt, iat as number)
) {
  throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorize");
}

const jwtPayload = {
  userId: user.id,
  role: user.role,
};

const accessToken = createToken(
  jwtPayload,
  config.jwt_access_secret as string,
  config.jwt_access_expires_in as string
);


return {
  accessToken
}


}


export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken
};
