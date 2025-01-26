import Link from "next/link";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { useRouter } from "next/router"; // Use useRouter hook for routing

const Header = () => {
  const [user, setUser] = useState<string>("Guest"); 
  const router = useRouter(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser); // Set user state if found
    }
  }, []); // Run only once on component mount

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("username"); // Optionally remove username
    setUser("Guest"); // Reset user state
    router.push("/login"); // Redirect to login page
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <h1 className="text-xl font-bold">Kodschul Management Hub</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <span className="text-sm">Welcome, {user}</span>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;