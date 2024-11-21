import axios from "axios";

const API_URL = "http://localhost:5400";

// Function to fetch user insights
export const fetchUserInsights = async (userId: number) => {
  try {
    const endpoints = [
      `/report/min_entries_per_report/${userId}`,
      `/report/max_entries_per_report/${userId}`,
      `/report/avg_entries_per_report/${userId}`,
      `/report/total_entries_and_reports/${userId}`, 
    ];

    const [minEntriesResponse, maxEntriesResponse, avgEntriesResponse, totalEntriesReportsResponse] =
      await Promise.all(
        endpoints.map((endpoint) => axios.get(`${API_URL}${endpoint}`)),
      );

    return [
      {
        metric: "Minimum Entries Per Report",
        value: minEntriesResponse.data.min_entries,
      },
      {
        metric: "Maximum Entries Per Report",
        value: maxEntriesResponse.data.max_entries,
      },
      {
        metric: "Average Entries Per Report",
        value: Math.round(avgEntriesResponse.data.avg_entries * 100) / 100,
      },
      {
        metric: "Total Number of Entries and Reports Combined",  
        value: totalEntriesReportsResponse.data.total_entries_reports,
      },
    ];
  } catch (error) {
    console.error("Error fetching user insights:", error);
    throw new Error("Failed to fetch user insights.");
  }
};
