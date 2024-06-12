import { Router } from "express";
import { UserRouter } from "../modules/User/user.route";
import { StudentRoutes } from "../modules/students/student.route";
import { AcademicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.router";
import { facultyRoute } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { SemesterRegistrationRoutes } from "../modules/SemesterRegistration/semesterRegistration.route";
import { offeredCourseRoutes } from "../modules/OfferedCourse/offeredCourse.route";
import { AuthRoute } from "../modules/Auth/auth.route";

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
    path: "/faculties",
    route: facultyRoute,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semester-registrations",
    route: SemesterRegistrationRoutes,
  },
  {
    path: "/offered-course",
    route: offeredCourseRoutes,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;

