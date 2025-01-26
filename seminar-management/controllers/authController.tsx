/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAPI ,signupAPI} from "../apis/authAPI";



export const loginController = async (email: string, password: string) => {
  try {
    // Call the loginAPI, expecting it to return an object with token and username
    const data = await loginAPI(email, password);
    
    // Destructure the token and username from the response
    const { token, username } = data; 
    
    // Store the token and username in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    
    return { success: true, message: "Login successful" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
};


export const signupController = async (username: string, email: string, password: string) => {
  try {
    const { token } = await signupAPI(username, email, password);
    localStorage.setItem("token", token); 
    return { success: true, message: "Signup successful" };
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred" };
  }
};
