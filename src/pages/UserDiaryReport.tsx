import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDiaryReportByID } from "../assets/services/diary/userDiaryReports";
import "../assets/css/pages/UserDiaryReportCreate.css";

const UserDiaryReportView: React.FC = function () {
  const { reportId } = useParams();
  const [report, setReport] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        const fetchedReport = await getDiaryReportByID(Number(reportId));
        // TODO: entry and song fetching
        setReport(fetchedReport);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching report:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  if (isLoading) {
    return <div className="container">Loading report...</div>;
  }

  if (isError || !report) {
    return <div className="container">Error: Could not load the report.</div>;
  }

  return (
    <div className="container">
      <h2>Report {report.reportId}</h2>
      {report.headerStartDate || report.headerEndDate ? (
        <p>
          ({report.headerStartDate || "All Time"} -{" "}
          {report.headerEndDate || "Today"})
        </p>
      ) : null}
      <h3>Diary Entries:</h3>
      <ul className="report-list">
        {report.entries.map((entry: any, index: number) => (
          <li key={index}>
            <strong>Date:</strong> {new Date(entry.Date).toLocaleDateString()}{" "}
            <br />
            <strong>Description:</strong> {entry.Description} <br />
            <strong>Visibility:</strong> {entry.Visibility}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDiaryReportView;
