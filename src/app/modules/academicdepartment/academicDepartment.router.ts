import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment);
router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getAcademicDepartmentById
);
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDepartmentById
);
// router.post(
//   "/create-student",
//   validateRequest(studentValidationSchemas.createStudentValidationSchema),
//   UserControllers.createUSer
// );

export const AcademicDepartmentRoutes = router;
