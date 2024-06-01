import express from "express";
import { UserControllers } from "./user.controller";

import { studentValidationSchemas } from "../students/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidationSchemas.createStudentValidationSchema),
  UserControllers.createUSer
);

export const UserRouter = router;
