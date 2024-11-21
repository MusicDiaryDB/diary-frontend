import axios from "axios";

const API_BASE_URL = "http://localhost:5400";

// Function to add a friend
export const addFriend = async (userId: number, username: string) => {
    try {
      console.log("Adding friend with username:", username, "for UserID:", userId);
  
      const response = await axios.post(
        `${API_BASE_URL}/${userId}/add_friend`, // Pass user_id in the URL
        { friendUsername: username } // Pass friendUsername in the request body
      );
  
      if (response.status === 409) {
        // Handle 409 (Friendship already exists)
        console.error("Already friends");
        return { success: false, error: response.data.error || "Friendship already exists" };
      }
  
      if (response.status === 200) {
        console.log("Friend added successfully.");
        return { success: true };
      }
  
      console.error("Error adding friend:", response.data.error);
      return { success: false, error: response.data.error };
  
    } catch (error: any) {
      // Handle unexpected errors
      console.error("Error adding friend:", error);
      return { success: false, error: error.message };
    }
  };
