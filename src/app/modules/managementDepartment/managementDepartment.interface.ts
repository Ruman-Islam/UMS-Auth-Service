import { Model } from 'mongoose';

export type ManagementDepartmentType = {
  title: string | undefined;
};

export type ManagementDepartmentModel = Model<
  ManagementDepartmentType,
  Record<string, unknown>
>;

export type ManagementDepartmentFilterType = {
  searchTerm?: string;
  title?: string;
};
