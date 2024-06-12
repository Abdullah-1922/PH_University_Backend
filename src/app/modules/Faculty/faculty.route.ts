import { Router } from "express";
import { facultyController } from "./faculty.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const route = Router();

route.get("/:id", facultyController.getFacultyById);
route.patch("/:id", facultyController.updateFaculty);
route.delete("/:id", facultyController.deleteFaculty);
route.get("/",auth(USER_ROLE.admin,USER_ROLE.faculty), facultyController.getAllFaculty);

export const facultyRoute = route;

