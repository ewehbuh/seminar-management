/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Header from "../components/Header";
import TrainerModal from "@/components/modals/CreateTrainerModal";
import { getTrainers, createTrainer, updateTrainer, removeTrainer } from "@/apis/trainerApi";

interface Trainer {
  id: string;
  trainerName: string;
  trainerSubjects: string[];
  trainerLocation: string;
  trainerEmail: string;
}

export default function Trainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);

  // Fetch trainers from the API
  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const data: Trainer[] = await getTrainers();
      setTrainers(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch trainers.");
    } finally {
      setLoading(false);
    }
  };

  // Handle creating a new trainer
  const handleCreateTrainer = async (trainerData: Omit<Trainer, "id">) => {
    try {
      const newTrainer: Trainer = await createTrainer(trainerData);
      setTrainers((prev: Trainer[]) => [...prev, newTrainer]);
    } catch (err: any) {
      alert(err.message || "Failed to create trainer.");
    }
  };

  // Handle updating a trainer
  const handleUpdateTrainer = async (trainerId: string, updatedTrainer: Partial<Trainer>) => {
    try {
      const updated: Trainer = await updateTrainer(trainerId, updatedTrainer);
      setTrainers((prev) =>
        prev.map((trainer) => (trainer.id === trainerId ? { ...trainer, ...updated } : trainer))
      );
    } catch (err: any) {
      alert(err.message || "Failed to update trainer.");
    }
  };

  // Handle deleting a trainer
  const handleDeleteTrainer = async (trainerId: string) => {
    if (confirm("Are you sure you want to delete this trainer?")) {
      try {
        await removeTrainer(trainerId);
        setTrainers((prev) => prev.filter((trainer) => trainer.id !== trainerId));
      } catch (err: any) {
        alert(err.message || "Failed to delete trainer.");
      }
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Trainers</h1>
        <button
          onClick={() => {
            setEditingTrainer(null); // Reset editing trainer
            setModalOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Create Trainer
        </button>
        {isModalOpen && (
          <TrainerModal
            isOpen={isModalOpen} // Set the modal to open
            onClose={() => {
              setModalOpen(false);
              setEditingTrainer(null); // Reset editing trainer when modal closes
            }}
            onSubmit={(data) => {
              if (editingTrainer) {
                handleUpdateTrainer(editingTrainer.id, data);
              } else {
                handleCreateTrainer(data);
              }
              setModalOpen(false);
            }}
            trainer={editingTrainer} // Pass the current trainer for editing
          />
        )}
        {loading ? (
          <p>Loading trainers...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : trainers.length === 0 ? (
          <p className="text-gray-500">No trainers available.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Subjects</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.id}>
                  <td className="border border-gray-300 px-4 py-2">{trainer.trainerName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {trainer.trainerSubjects.join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{trainer.trainerLocation}</td>
                  <td className="border border-gray-300 px-4 py-2">{trainer.trainerEmail}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditingTrainer(trainer);
                        setModalOpen(true); // Open modal for editing
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTrainer(trainer.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}