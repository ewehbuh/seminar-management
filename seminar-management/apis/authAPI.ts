export const loginAPI = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error || "Login failed. Please try again.");
    }
  
    return data; 
  };
  
  export const signupAPI = async (username: string, email: string, password: string) => {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error || "Signup failed. Please try again.");
    }
  
    return data; // Assuming `data` includes `token`
  };
  