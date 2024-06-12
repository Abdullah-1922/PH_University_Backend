import express from "express";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";

const router = express.Router();

router.post(
  "/create-semester-registration",

  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);

router.get("/", SemesterRegistrationControllers.getAllSemesterRegistration);
router.get("/:id", SemesterRegistrationControllers.getSemesterRegistrationById);
router.patch(
  "/:id",validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.updateSemesterRegistration
);
router.delete(
  "/:id",
  SemesterRegistrationControllers.deleteSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
