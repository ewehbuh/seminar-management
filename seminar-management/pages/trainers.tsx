/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

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

  const user = "John Doe";

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/handler", {
        params: { endpoint: "getTrainers" },
      });
      setTrainers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch trainers.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrainer = async () => {
    const newTrainer: Omit<Trainer, "id"> = {
      trainerName: "New Trainer",
      trainerSubjects: ["Subject A"],
      trainerLocation: "Location A",
      trainerEmail: "trainer@example.com",
    };

    try {
      const response = await axios.post("/api/handler", newTrainer, {
        params: { endpoint: "createTrainer" },
      });
      setTrainers((prev) => [...prev, response.data]);
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to create trainer.");
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div>
      <Header user={user} onSignOut={() => console.log("User signed out")} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Trainers</h1>
        <button
          onClick={handleCreateTrainer}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Create Trainer
        </button>
        {loading ? (
          <p>Loading trainers...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div>
            {/* Render Trainers */}
          </div>
        )}
      </div>
    </div>
  );
}
