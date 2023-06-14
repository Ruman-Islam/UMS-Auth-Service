import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { StudentType } from './student.interface';
import { studentFilterableField } from './student.constant';
import { StudentService } from './student.services';

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, studentFilterableField);

  // To manage pagination fields
  const paginationOptions = pick(req.query, paginationFields);

  // Calling the service
  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  // Dynamic response sender generic function to ensure response format
  return sendResponse<StudentType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Student retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  // Extract the semester ID from the request parameters
  const id = req.params.id;

  // Call the StudentService to get the single semester
  const result = await StudentService.getSingleStudent(id);

  // Dynamic response sender generic function to ensure response format
  return sendResponse<StudentType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Semester retrieved successfully',
    meta: null,
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the semester ID from the request parameters
  const updatedData = req.body; // Get the updated semester data from the request body

  // Calling the service
  const result = await StudentService.updateStudent(id, updatedData); // Call the service to update the semester using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<StudentType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Semester updated successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the updated semester data in the response
  });
});

const deleteSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  // Retrieving data from request
  const id = req.params.id; // Get the Student ID from the request parameters

  // Calling the service
  const result = await StudentService.deleteSingleStudent(id); // Call the service to delete the Student using the provided ID and data

  // Dynamic response sender generic function to ensure response format
  return sendResponse<StudentType>(res, {
    statusCode: httpStatus.OK, // Set the status code to indicate a successful update
    success: true, // Set the success flag to indicate a successful operation
    message: 'Student delete successfully', // Provide a descriptive message about the update
    meta: null, // No additional metadata needed for this response
    data: result, // Provide the delete Student data in the response
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteSingleStudent,
};
