import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserInsights } from "../assets/services/insights";
import "../assets/css/pages/Insights.css";

interface Insight {
  metric: string;
  value: number;
}

const UserInsights: React.FC = () => {
  const { userId } = useParams(); // Dynamically get the userId from the route params
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserInsights = async () => {
      if (userId) {
        try {
          const data = await fetchUserInsights(Number(userId));
          setInsights(data);
        } catch (err) {
          setError("Failed to fetch user insights.");
        } finally {
          setLoading(false);
        }
      }
    };

    getUserInsights();
  }, [userId]);

  return (
    <div className="container user-insights-container">
      <h2>User Insights</h2>
      {loading ? (
        <p>Loading user insights...</p>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : insights.length === 0 ? (
        <p>No insights available for this user.</p>
      ) : (
        <table className="insights-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {insights.map((insight, index) => (
              <tr key={index}>
                <td>{insight.metric}</td>
                <td>{insight.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserInsights;
