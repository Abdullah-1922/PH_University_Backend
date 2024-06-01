import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);

router.get("/", AcademicSemesterControllers.getAllSemester);
router.get("/:semesterId", AcademicSemesterControllers.getSemesterById);
router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateSemesterById
);
// router.post(
//   "/create-student",
//   validateRequest(studentValidationSchemas.createStudentValidationSchema),
//   UserControllers.createUSer
// );

export const AcademicSemesterRouters = router;
