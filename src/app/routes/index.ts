import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { StudentRoutes } from "../modules/students/student.route";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.router";
import { facultyRoute } from "../modules/Faculty/faculty.route";

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
  {
    path: "/faculty",
    route: facultyRoute,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
