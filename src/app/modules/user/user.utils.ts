// import { AcademicSemesterType } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterType } from '../academicSemester/academicSemester.interface';
// import { UserType } from './user.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: AcademicSemesterType | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester?.year.substring(2, 4)}${
    academicSemester?.code
  }${incrementedId}`;

  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incremented = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incremented = `F-${incremented}`;

  return incremented;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');

  let incremented = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incremented = `A-${incremented}`;

  return incremented;
};
