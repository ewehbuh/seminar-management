/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const BASE_URL = "http://localhost:5000"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  try {
    switch (query.endpoint) {
      case "signup": {
        if (method === "POST") {
          const response = await axios.post(`${BASE_URL}/auth/signup`, body);
          return res.status(response.status).json(response.data);
        }
        break;
      }

      case "login": {
        if (method === "POST") {
          const response = await axios.post(`${BASE_URL}/auth/login`, body);
          return res.status(response.status).json(response.data);
        }
        break;
      }

      case "createCourse": {
        if (method === "POST") {
          const response = await axios.post(`${BASE_URL}/courses`, body);
          return res.status(response.status).json(response.data);
        }
        break;
      }

      case "updateCourse": {
        if (method === "PATCH") {
          const response = await axios.patch(`${BASE_URL}/courses/${query.id}`, body);
          return res.status(response.status).json(response.data);
        }
        break;
      }

      case "createTrainer": {
        if (method === "POST") {
          const response = await axios.post(`${BASE_URL}/trainers`, body);
          return res.status(response.status).json(response.data);
        }
        break;
      }

      case "updateTrainer": {
        if (method === "PATCH") {
          const response = await axios.patch(`${BASE_URL}/trainers/${query.id}`, body);
          return res.status(response.status).json(response.data);
        }
        break;
      }

      case "assignTrainer": {
        if (method === "POST") {
          const response = await axios.post(
            `${BASE_URL}/courses/${query.courseId}/assign/${query.trainerId}`,
            body
          );
          return res.status(response.status).json(response.data);
        }
        break;
      }

      case "getCourses": {
        if (method === "GET") {
          const response = await axios.get(`${BASE_URL}/courses`);
          return res.status(response.status).json(response.data);
        }
        break;
      }

      case "getTrainers": {
        if (method === "GET") {
          const response = await axios.get(`${BASE_URL}/trainers`);
          return res.status(response.status).json(response.data);
        }
        break;
      }

      default:
        return res.status(404).json({ error: "Invalid endpoint" });
    }
  } catch (error: any) {
    // Handle errors gracefully
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || "Internal Server Error",
    });
  }
}
