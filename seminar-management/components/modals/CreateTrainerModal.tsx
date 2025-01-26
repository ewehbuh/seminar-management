/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface Trainer {
  trainerName: string;
  trainerSubjects: string[];
  trainerLocation: string;
  trainerEmail: string;
}

interface TrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trainerData: Trainer) => void;
  trainer?: Trainer | null; // Optional: Used for editing
}

const TrainerModal: React.FC<TrainerModalProps> = ({ isOpen, onClose, onSubmit, trainer }) => {
  const [formData, setFormData] = useState<Trainer>({
    trainerName: "",
    trainerSubjects: [],
    trainerLocation: "",
    trainerEmail: "",
  });

  useEffect(() => {
    if (trainer) {
      setFormData(trainer);
    } else {
      setFormData({
        trainerName: "",
        trainerSubjects: [],
        trainerLocation: "",
        trainerEmail: "",
      });
    }
  }, [trainer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "trainerSubjects") {
      setFormData({
        ...formData,
        trainerSubjects: value.split(",").map((subject) => subject.trim()), // Split subjects by comma
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {trainer ? "Edit Trainer" : "Create Trainer"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Trainer Name</label>
            <input
              type="text"
              name="trainerName"
              value={formData.trainerName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Subjects (comma-separated)</label>
            <input
              type="text"
              name="trainerSubjects"
              value={formData.trainerSubjects.join(", ")}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="trainerLocation"
              value={formData.trainerLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="trainerEmail"
              value={formData.trainerEmail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
              {trainer ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainerModal;
