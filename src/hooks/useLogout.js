import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const API_BASE_URL =
    import.meta.env.MODE === "development"
      ? ""
      : "https://chat-api-production-2c0b.up.railway.app";

  const logout = async () => {
    setLoading(true); // Set loading to true at the start of logout
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include", // Include cookies in the request
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
}

export default useLogout;
