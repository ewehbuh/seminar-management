const fetchWithToken = async (url: string, options: RequestInit) => {
    const token = localStorage.getItem("token");
    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred");
    }
    return response;
  };
  
  export default fetchWithToken;
  