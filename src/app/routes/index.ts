import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = express.Router();

// Defining an array of module routes to be mounted on the router
const moduleRoutes = [
  {
    // Mount the UserRoutes to handle requests with the '/api/v1/users/' path prefix
    path: '/users',
    route: UserRoutes,
  },
  {
    // Mount the AcademicSemesterRoutes to handle requests with the '/api/v1/academic-semesters/' path prefix
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    // Mount the AcademicFacultyRoutes to handle requests with the '/api/v1/academic-semesters/' path prefix
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
];

// Iterate over the moduleRoutes array and mount each route on the router
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
