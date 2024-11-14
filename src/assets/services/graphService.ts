import axios from 'axios';

const API_URL = 'http://localhost:5400';

interface UserVisibilityData {
  Visibility: string;
  user_count: number;
}

interface SongsByArtistData {
  Name: string;
  total_songs: number;
}

interface UsersMostEntriesData {
  username: string;
  entry_count: number;
}

export const fetchGraphData = async (): Promise<UserVisibilityData[]> => {
  try {
    const response = await axios.get(`${API_URL}/report/user_count_by_visibility`);
    console.log("Fetched graph data:", response.data);
    return response.data;  // Assumes the data structure matches this type
  } catch (error: any) {
    console.error("Error fetching graph data:", error.response?.data || error.message);
    throw new Error('Failed to fetch graph data');
  }
};

export const fetchSongsReleasedByArtist = async (): Promise<SongsByArtistData[]> => {
  try {
    const response = await axios.get(`${API_URL}/report/songs_released_by_artist`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching songs released by artist:", error.response?.data || error.message);
    throw new Error('Failed to fetch songs by artist');
  }
};

export const fetchUsersWithMostEntries = async (): Promise<UsersMostEntriesData[]> => {
  try {
    const response = await axios.get(`${API_URL}/report/users_with_most_entries`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching users with most entries:", error.response?.data || error.message);
    throw new Error('Failed to fetch users with most entries');
  }
};
