/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCourses, postCourse, patchCourse, removeCourse } from "../apis/coursesApi";

export const fetchCourses = async () => getCourses();

export const createCourse = async (course: any) => postCourse(course);

export const updateCourse = async (courseId: string, updatedCourse: any) =>
  patchCourse(courseId, updatedCourse);

export const deleteCourse = async (courseId: string) => removeCourse(courseId);

