import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  DiaryReport,
  getDiaryReportByID,
  getReportEntrySongs,
} from "../assets/services/diary/userDiaryReports";
import "../assets/css/pages/UserReviews.css";
import { DisplayEntry } from "../assets/services/diary/userDiaryEntries";

const UserDiaryReport: React.FC = function () {
  const { reportId } = useParams();
  const [report, setReport] = useState<DiaryReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [displayEntries, setDisplayEntries] = useState<DisplayEntry[]>([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);

        // get report contents
        const rep = await getDiaryReportByID(Number(reportId));
        setReport(rep);

        // extract songs
        const de = await getReportEntrySongs(rep.ReportID);
        setDisplayEntries(de);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching report:", error);
        setIsError(true);
        setIsLoading(false);
        return;
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
      <h2>
        Report {report.ReportID} - {report.Date}
      </h2>
      {displayEntries.length !== 0 ? (
        <div>
          <h3>Report Entries:</h3>
          <div className="result-list">
            {displayEntries.map((entry: DisplayEntry) => (
              <div className="result-container" key={entry.EntryID}>
                <h3>
                  Song: <em>{entry.SongName}</em>
                </h3>
                <h4>Artist: {entry.ArtistName}</h4>
                <h4>Album: {entry.AlbumName}</h4>
                <strong>Date:</strong>{" "}
                {new Date(entry.Date).toLocaleDateString()} <br />
                <strong>Description:</strong> {entry.Description}
                <br />
                <strong>Visibility:</strong> {entry.Visibility}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h3 className="empty-result">No entries found for report.</h3>
      )}
    </div>
  );
};

export default UserDiaryReport;
