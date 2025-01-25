/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CreateCourseModal from "../components/modals/create_course";
import EditCourseModal from "../components/modals/edit_course";
import { fetchCourses, createCourse, updateCourse, deleteCourse } from "../controllers/coursesController";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createCourseModalOpen, setCreateCourseModalOpen] = useState(false);
  const [editCourseModalOpen, setEditCourseModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const handleCreateCourse = async (course: any) => {
    try {
      await createCourse(course);
      const updatedCourses = await fetchCourses();
      setCourses(updatedCourses);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEditCourse = async (courseId: string, updatedCourse: any) => {
    try {
      await updateCourse(courseId, updatedCourse);
      const updatedCourses = await fetchCourses();
      setCourses(updatedCourses);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        setCourses((prev) => prev.filter((course: any) => course.id !== courseId));
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div>
      <Header user="John Doe" onSignOut={() => console.log("Signed out")} />
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Courses</h1>
        <button
          onClick={() => setCreateCourseModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 mb-4"
        >
          Create Course
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 border-b">Course Name</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Subject</th>
                <th className="py-3 px-4 border-b">Location</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course: any) => (
                <tr key={course.id}>
                  <td className="py-3 px-4 border-b">{course.name}</td>
                  <td className="py-3 px-4 border-b">{course.date}</td>
                  <td className="py-3 px-4 border-b">{course.subject}</td>
                  <td className="py-3 px-4 border-b">{course.location}</td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setEditCourseModalOpen(true);
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <CreateCourseModal
        isOpen={createCourseModalOpen}
        onClose={() => setCreateCourseModalOpen(false)}
        onCreate={handleCreateCourse}
      />

      {selectedCourse && (
        <EditCourseModal
          isOpen={editCourseModalOpen}
          onClose={() => setEditCourseModalOpen(false)}
          onEdit={handleEditCourse}
          course={selectedCourse}
        />
      )}
    </div>
  );
}
