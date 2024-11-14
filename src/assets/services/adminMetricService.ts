import axios from "axios";

const API_BASE_URL = "http://localhost:5400/report";

export const fetchTotalUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/total_users`);
    return response.data;
  } catch (error) {
    console.log("Error getting total users:", error);
    throw error;
  }
};

export const fetchAvgVisibilityEntries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/avg_visibility_entries`);
    return response.data;
  } catch (error) {
    console.log("Error getting avg visibility:", error);
    throw error;
  }
};

export const fetchReviewsPerSong = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews_per_song`);
    return response.data;
  } catch (error) {
    console.log("Error getting reviews per song:", error);
    throw error;
  }
};

export const fetchEntriesByDate = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/entries_by_date`);
    return response.data;
  } catch (error) {
    console.log("Error getting entries by date:", error);
    throw error;
  }
};

export const fetchFriendCounts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/friend_counts`);
    return response.data;
  } catch (error) {
    console.log("Error getting friend counts:", error);
    throw error;
  }
};

export const fetchVisibilityCountEntries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visibilty_count_entries`);
    return response.data;
  } catch (error) {
    console.log("Error getting entry count by visibility:", error);
    throw error;
  }
};

export const fetchMostReviewedSongs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/most_reviewed_songs`);
    return response.data;
  } catch (error) {
    console.log("Error getting database-wide size information:", error);
    throw error;
  }
};

// Additional aggregate report endpoints if needed
export const fetchSongsReleasedByArtist = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/songs_released_by_artist`,
    );
    return response.data;
  } catch (error) {
    console.log("Error getting songs by artist:", error);
    throw error;
  }
};

export const fetchUsersWithMostEntries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users_with_most_entries`);
    return response.data;
  } catch (error) {
    console.log("Error getting users with most entries:", error);
    throw error;
  }
};

export const fetchUserCountByVisibility = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user_count_by_visibility`,
    );
    return response.data;
  } catch (error) {
    console.log("Error getting user count by vis:", error);
    throw error;
  }
};
