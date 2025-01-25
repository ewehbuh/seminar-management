/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CreateCourseModal from "../components/modals/create_course";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createCourseModalOpen, setCreateCourseModalOpen] = useState(false);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/courses`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch courses.");
      }
      setCourses(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching courses:", err); // Log the error to the console
    }
  };

  const handleCreateCourse = async (course: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create course.");
      }
      await fetchCourses(); // Refresh courses after creation
    } catch (err: any) {
      alert(err.message);
      console.error("Error creating course:", err); // Log the error to the console
    }
  };

  const deleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete course.");
      }
      setCourses((prev) => prev.filter((course: any) => course.id !== courseId));
    } catch (err: any) {
      alert(err.message);
      console.error("Error deleting course:", err); // Log the error to the console
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCourses().finally(() => setLoading(false));
  }, []);

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
                      onClick={() => console.log(`Edit course ${course.id}`)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCourse(course.id)}
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

      {/* Create Course Modal */}
      <CreateCourseModal
        isOpen={createCourseModalOpen}
        onClose={() => setCreateCourseModalOpen(false)}
        onCreate={handleCreateCourse}
      />
    </div>
  );
}
