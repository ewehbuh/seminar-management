/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchWithToken from "../utils/fetchWithToken";

const BASE_URL = "http://localhost:5000/api/trainers";

export const getTrainers = async () => {
  try {
    const response = await fetchWithToken(BASE_URL, { method: "GET" });
    if (!response.ok) {
      throw new Error("Failed to fetch trainers.");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching trainers.");
  }
};

export const createTrainer = async (trainerData: any) => {
  try {
    const response = await fetchWithToken(BASE_URL, {
      method: "POST",
      body: JSON.stringify(trainerData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create trainer.");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while creating trainer.");
  }
};

export const updateTrainer = async (trainerId: string, updatedTrainer: any) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/${trainerId}`, {
      method: "PATCH",
      body: JSON.stringify(updatedTrainer),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update trainer.");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while updating trainer.");
  }
};

export const removeTrainer = async (trainerId: string) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/${trainerId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete trainer.");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while deleting trainer.");
  }
};

export const getBestAvailableTrainers = async (courseId: string) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/trainers/best/${courseId}`, { method: "GET" });
    if (!response.ok) throw new Error("Failed to fetch trainers.");
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching trainers.");
  }
};

// Assign a trainer to a course
export const assignTrainer = async (courseId: string, trainerId: string) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/assign/${courseId}/${trainerId}`, {
      method: "POST",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to assign trainer.");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while assigning trainer.");
  }
};


export const getMetadata = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/metadata`, { method: "GET" });
    if (!response.ok) {
      throw new Error("Failed to fetch metadata.");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching metadata.");
  }
};