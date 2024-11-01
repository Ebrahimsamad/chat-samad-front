import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const API_BASE_URL =
    import.meta.env.MODE === "development"
      ? ""
      : "https://chat-api-production-2c0b.up.railway.app";

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/users`, {
          method: "GET",
          credentials: "include", // Include cookies in requests
        });

        // Check if the response is okay (status code 200-299)
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch conversations");
        }

        const data = await res.json();
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
}

export default useGetConversations;
