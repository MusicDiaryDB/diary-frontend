import axios from 'axios';

const API_BASE_URL = 'http://localhost:5400/report';

export const fetchTotalUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/total_users`);
  return response.data;
};

export const fetchAvgVisibilityEntries = async () => {
  const response = await axios.get(`${API_BASE_URL}/avg_visibility_entries`);
  return response.data;
};

export const fetchReviewsPerSong = async () => {
  const response = await axios.get(`${API_BASE_URL}/reviews_per_song`);
  return response.data;
};

export const fetchEntriesByDate = async () => {
  const response = await axios.get(`${API_BASE_URL}/entries_by_date`);
  return response.data;
};

export const fetchFriendCounts = async () => {
  const response = await axios.get(`${API_BASE_URL}/friend_counts`);
  return response.data;
};

export const fetchVisibilityCountEntries = async () => {
  const response = await axios.get(`${API_BASE_URL}/visibilty_count_entries`);
  return response.data;
};

export const fetchMostReviewedSongs = async () => {
  const response = await axios.get(`${API_BASE_URL}/most_reviewed_songs`);
  return response.data;
};

// Additional aggregate report endpoints if needed
export const fetchSongsReleasedByArtist = async () => {
  const response = await axios.get(`${API_BASE_URL}/songs_released_by_artist`);
  return response.data;
};

export const fetchUsersWithMostEntries = async () => {
  const response = await axios.get(`${API_BASE_URL}/users_with_most_entries`);
  return response.data;
};

export const fetchUserCountByVisibility = async () => {
  const response = await axios.get(`${API_BASE_URL}/user_count_by_visibility`);
  return response.data;
};
