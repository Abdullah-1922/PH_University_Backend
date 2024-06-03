import { Router } from "express";
import { facultyController } from "./faculty.controller";

const route =Router()

route.get('/:facultyId',facultyController.getFacultyById)



export const facultyRoute =route

