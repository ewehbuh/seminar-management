/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAPI ,signupAPI} from "../apis/authAPI";

export const loginController = async (email: string, password: string) => {
  try {
    const { token } = await loginAPI(email, password);
    localStorage.setItem("token", token); // Store token in localStorage
    return { success: true, message: "Login successful" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
};



export const signupController = async (username: string, email: string, password: string) => {
  try {
    const { token } = await signupAPI(username, email, password);
    localStorage.setItem("token", token); // Store token in localStorage
    return { success: true, message: "Signup successful" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
};
