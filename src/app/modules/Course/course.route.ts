import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseControllers } from "./course.controller";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.get("/", CourseControllers.getAllCourse);
router.get("/:id", CourseControllers.getCourseById);
router.patch(
  "/:id",
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourseById
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidation.FacultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesIntoCourse
);
router.delete(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidation.FacultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesIntoCourse
);

router.delete("/:id", CourseControllers.deleteCourseById);

export const CourseRoutes = router;
