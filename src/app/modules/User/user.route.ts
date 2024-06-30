import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";

import { studentValidationSchemas } from "../students/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { facultyValidations } from "../Faculty/faculty.validation";
import { AdminValidations } from "../Admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { UserValidation } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  validateRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  "/create-faculty",
  auth(USER_ROLE.admin), upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty
);
router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);
router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),

  UserControllers.getMe
);
router.post(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus
);

export const UserRouter = router;
