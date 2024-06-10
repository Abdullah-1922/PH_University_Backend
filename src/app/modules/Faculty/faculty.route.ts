import { Router } from "express";
import { facultyController } from "./faculty.controller";

const route = Router();

route.get("/:id", facultyController.getFacultyById);
route.patch("/:id", facultyController.updateFaculty);
route.delete("/:id", facultyController.deleteFaculty);
route.get("/", facultyController.getAllFaculty);

export const facultyRoute = route;
