import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getUserDiaryReports,
  DiaryReport,
} from "../assets/services/diary/userDiaryReports";
import "../assets/css/pages/UserReports.css";

const UserDiaryReports: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [reports, setReports] = useState<DiaryReport[]>([]);

  const fetchReports = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await getUserDiaryReports(Number(userId));
      setReports(res);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="container">
      <h2>Your Reports</h2>
      <div className="button-container">
        <button className="button-common button-submit" onClick={fetchReports}>
          Refresh Reports
        </button>
        <Link
          to={`/user/${userId}/reports/new`}
          className="button-common button-generate"
        >
          Generate Report
        </Link>
      </div>
      <div className="result-list">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.ReportID} className="result-container report-card">
              <a href={`report/${report.ReportID.toString()}`}>
                <h3>{report.Date}</h3>
                <p>
                  <strong>{report.Description}</strong>
                </p>
                <p>
                  <strong>Visibility:</strong> {report.Visibility}
                </p>
              </a>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDiaryReports;
