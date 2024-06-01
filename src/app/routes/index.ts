import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { StudentRoutes } from "../modules/students/student.route";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicdepartment/academicDepartment.router";

const router = Router();

const moduleRouters = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRouters,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: AcademicDepartmentRoutes,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
