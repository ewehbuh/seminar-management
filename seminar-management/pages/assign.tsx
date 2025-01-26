/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getBestAvailableTrainers, assignTrainer } from "@/apis/trainerApi";

export default function AssignPage() {
  const router = useRouter();
  const { courseId, name, subject, date, location } = router.query;

  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady || !courseId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const bestTrainers = await getBestAvailableTrainers(courseId as string);
        setTrainers(bestTrainers);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching trainers.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, courseId]);

  const handleAssignTrainer = async (trainerId: string) => {
    try {
      await assignTrainer(courseId as string, trainerId);
      alert("Trainer assigned successfully!");
      router.push("/courses");
    } catch (err: any) {
      alert(err.message || "Failed to assign trainer.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Assign Trainer</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Course Details</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Location:</strong> {location}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Available Trainers</h2>
      {trainers && trainers.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Subjects</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer: any) => (
              <tr key={trainer.id}>
                <td className="py-3 px-4 border-b">{trainer.trainerName}</td>
                <td className="py-3 px-4 border-b">{trainer.trainerSubjects}</td>
                <td className="py-3 px-4 border-b">{trainer.trainerLocation}</td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => handleAssignTrainer(trainer.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No trainers available for this course.</p>
      )}

      <button
        onClick={() => router.push("/courses")}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Back to Courses
      </button>
    </div>
  );
}
