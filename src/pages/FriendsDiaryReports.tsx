import React, { useEffect, useState } from "react";
import { fetchFriendsDiaryReports } from "../assets/services/friendsDiaryReports";
import { useParams, useNavigate } from "react-router-dom";

interface DiaryReport {
  ReportID: number;
  Description: string;
  Date: string;
}

const FriendDiaryReports: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [friendsReports, setFriendsReports] = useState<{
    [key: string]: DiaryReport[];
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetFriendsDiaryReports = async () => {
      if (userId) {
        try {
          // Fetch all friends' diary reports using the current userId
          const reports = await fetchFriendsDiaryReports(Number(userId));
          console.log("Fetched all friends' diary reports: ", reports);
          setFriendsReports(reports);
        } catch (err) {
          setError("Could not fetch friends diary reports.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAndSetFriendsDiaryReports();
  }, [userId]);

  if (loading) {
    return <div>Loading diary reports...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1000px", width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Friends' Diary Reports
        </h2>
        {Object.keys(friendsReports).length === 0 ? (
          <p>No diary reports found for your friends.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4" }}>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Report Description
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Report Date
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(friendsReports).map((friendId) =>
                friendsReports[friendId].map((report, index) => (
                  <tr
                    key={`${friendId}-${report.ReportID}`}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f1f1f1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? "#fafafa" : "#ffffff";
                    }}
                    onClick={() => navigate(`report/${report.ReportID}`)}
                  >
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {friendId}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {report.Description}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <i>{report.Date}</i>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FriendDiaryReports;
