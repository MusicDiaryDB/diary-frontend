import axios from "axios";

const API_URL = "http://localhost:5400";

// Function to fetch user insights
export const fetchUserInsights = async (userId: number) => {
  try {
    const endpoints = [
      `/report/min_entries_per_report/${userId}`,
      `/report/max_entries_per_report/${userId}`,
      `/report/avg_entries_per_report/${userId}`,
    ];

    const [minEntriesResponse, maxEntriesResponse, avgEntriesResponse] =
      await Promise.all(
        endpoints.map((endpoint) => axios.get(`${API_URL}${endpoint}`))
      );

    return [
      { metric: "Minimum Entries Per Report", value: minEntriesResponse.data.value },
      { metric: "Maximum Entries Per Report", value: maxEntriesResponse.data.value },
      { metric: "Average Entries Per Report", value: avgEntriesResponse.data.value },
    ];
  } catch (error) {
    console.error("Error fetching user insights:", error);
    throw new Error("Failed to fetch user insights.");
  }
};
