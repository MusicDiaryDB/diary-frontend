import axios from 'axios';

const API_URL = 'http://localhost:5400';

// Fetch the user's friends (same as in diaryEntries.ts)
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

// Fetch all friends and their diary reports
export const fetchFriendsDiaryReports = async (userId: number) => {
    try {
        // Fetch friends of the user
        const friendsData = await fetchUserFriends(userId);

        // Create a map to store each friend's diary reports
        const friendsDiaryReportsMap: { [key: string]: any[] } = {};

        // Fetch each friend's diary reports
        for (const friend of friendsData) {
            const diaryReports = await fetchUserDiaryReports(friend.userId);
            friendsDiaryReportsMap[friend.username] = diaryReports;
        }

        console.log("Fetched all friends' diary reports:", friendsDiaryReportsMap);
        return friendsDiaryReportsMap;
    } catch (error) {
        console.error("Error fetching friends' diary reports", error);
        throw new Error('Failed to fetch friends\' diary reports');
    }
};

// Fetch the diary reports for a given user
const fetchUserDiaryReports = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:5400/report/user/${userId}`);
      console.log("Fetched diary reports:", response.data);
  
      // Check if response.data.result is an array
      if (Array.isArray(response.data.result)) {
        return response.data.result; // Return the reports inside the result array
      } else {
        throw new Error("Diary reports data is not an array.");
      }
    } catch (error) {
      console.error("Error fetching diary reports:", error);
      throw error;
    }
};
