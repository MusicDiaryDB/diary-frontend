import axios from 'axios';

const API_URL = 'http://localhost:5400';

// Fetch the user's friends
export const fetchUserFriends = async (userId: number) => {
    try {
        console.log("Fetching friends for UserID:", userId);
        const response = await axios.get(`${API_URL}/user_friends/${userId}`);
        let friendsData = response.data;

        console.log("Fetched friends data:", friendsData);
        return friendsData.map((friend: any) => ({
            userId: friend.UserID,
            username: friend.Username,
        }));
    } catch (error) {
        console.error("Error fetching friends", error);
        throw new Error('Failed to fetch friends');
    }
};

// Fetch all friends and their diary entries
export const fetchFriendsDiaryEntries = async (userId: number) => {
    try {
        // Fetch friends of the user
        const friendsData = await fetchUserFriends(userId);

        // Create a map to store each friend's diary entries
        const friendsDiaryMap: { [key: string]: any[] } = {};

        // Fetch each friend's diary entries
        for (const friend of friendsData) {
            const diaryEntries = await fetchUserDiaryEntries(friend.userId);
            friendsDiaryMap[friend.username] = diaryEntries;
        }

        console.log("Fetched all friends' diary entries:", friendsDiaryMap);
        return friendsDiaryMap;
    } catch (error) {
        console.error("Error fetching friends' diary entries", error);
        throw new Error('Failed to fetch friends\' diary entries');
    }
};

// Fetch the diary entries for a given user
const fetchUserDiaryEntries = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:5400/entry/user/${userId}`);
      console.log("Fetched diary entries:", response.data);
  
      // Check if response.data.result is an array
      if (Array.isArray(response.data.result)) {
        return response.data.result; // Return the entries inside the result array
      } else {
        throw new Error("Diary entries data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching diary entries:", error);
      throw error;
    }
  };
    
  
  
