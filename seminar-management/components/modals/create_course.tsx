/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (course: any) => void; // Replace `any` with your course type
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    subject: "",
    location: "",
    participants: 0,
    notes: "",
    price: 0,
    trainerPrice: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "participants" || name === "price" || name === "trainerPrice" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData); // Pass the form data to the parent
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Course Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Participants</label>
            <input
              type="number"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              min={0}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              min={0}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Trainer Price</label>
            <input
              type="number"
              name="trainerPrice"
              value={formData.trainerPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              min={0}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
