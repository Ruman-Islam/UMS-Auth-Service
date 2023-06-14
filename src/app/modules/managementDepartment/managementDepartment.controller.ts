import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDepartmentType } from './managementDepartment.interface';
import { ManagementDepartmentService } from './managementDepartment.services';
import { managementDepartmentsFilterableField } from './managementDepartment.constant';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createManagementDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { ...managementDepartmentData } = req.body;
    // Call the UserService to create the ManagementDepartmentService
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData
    );

    // Dynamic response sender generic function to ensure response format
    return sendResponse<ManagementDepartmentType>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Management department created successfully',
      meta: null,
      data: result,
    });
  }
);

const getAllManagementDepartments: RequestHandler = catchAsync(
  async (req, res) => {
    const filters = pick(req.query, managementDepartmentsFilterableField);

    // To manage pagination fields
    const paginationOptions = pick(req.query, paginationFields);

    // Calling the service
    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      );

    // Dynamic response sender generic function to ensure response format
    return sendResponse<ManagementDepartmentType[]>(res, {
      statusCode: httpStatus.FOUND,
      success: true,
      message: 'Management Departments retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleManagementDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;

    // Calling the service
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    // Dynamic response sender generic function to ensure response format
    return sendResponse<ManagementDepartmentType>(res, {
      statusCode: httpStatus.FOUND,
      success: true,
      message: 'Management Department retrieved successfully',
      meta: null,
      data: result,
    });
  }
);

const updateManagementDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const { ...data } = req.body;

    // Calling the service
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      data
    );

    // Dynamic response sender generic function to ensure response format
    return sendResponse<ManagementDepartmentType>(res, {
      statusCode: httpStatus.FOUND,
      success: true,
      message: 'Management Department update successfully',
      meta: null,
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateManagementDepartment,
};
