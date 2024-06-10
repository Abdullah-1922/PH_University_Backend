import express from "express";
import { UserControllers } from "./user.controller";

import { studentValidationSchemas } from "../students/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { facultyValidations } from "../Faculty/faculty.validation";
import { AdminValidations } from "../Admin/admin.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  "/create-faculty",
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty
);
router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);


export const UserRouter = router;
