/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (courseId: string, updatedCourse: any) => void;
  course: any; // The course being edited
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({ isOpen, onClose, onEdit, course }) => {
  const [name, setName] = useState(course.name);
  const [date, setDate] = useState(course.date);
  const [subject, setSubject] = useState(course.subject);
  const [location, setLocation] = useState(course.location);

  const handleSubmit = () => {
    const updatedCourse = { name, date, subject, location };
    onEdit(course.id, updatedCourse);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
