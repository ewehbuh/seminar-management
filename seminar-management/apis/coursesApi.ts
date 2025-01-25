/* eslint-disable @typescript-eslint/no-explicit-any */

import fetchWithToken from "../utils/fetchWithToken";

const BASE_URL = "http://localhost:5000/api/courses";

export const getCourses = async () => {
  const response = await fetchWithToken(BASE_URL, { method: "GET" });
  return await response.json();
};

export const postCourse = async (course: any) => {
  const response = await fetchWithToken(BASE_URL, {
    method: "POST",
    body: JSON.stringify(course),
  });
  return await response.json();
};

export const patchCourse = async (courseId: string, updatedCourse: any) => {
  const response = await fetchWithToken(`${BASE_URL}/${courseId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedCourse),
  });
  return await response.json();
};

export const removeCourse = async (courseId: string) => {
  const response = await fetchWithToken(`${BASE_URL}/${courseId}`, { method: "DELETE" });
  return await response.json();
};
