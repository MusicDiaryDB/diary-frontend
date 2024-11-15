import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserDiaryReport } from "../assets/services/diary/userDiaryReports";
import { useParams } from "react-router-dom";
import "../assets/css/pages/UserDiaryReportCreate.css";

const UserDiaryReportCreate: React.FC = function () {
  const [visibility, setVisibility] = useState("PUBLIC");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [entries, setEntries] = useState<any[]>([]);
  const [reportId, setReportId] = useState<number | null>(null);
  const [renderFlag, setRenderFlag] = useState(false);
  const [headerStartDate, setHeaderStartDate] = useState<string | null>(null);
  const [headerEndDate, setHeaderEndDate] = useState<string | null>(null);

  // Extract userId from the route
  const { userId } = useParams();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () =>
      createUserDiaryReport(visibility, Number(userId), startDate, endDate),
    onSuccess: ({
      reportId,
      filteredEntries,
    }: {
      reportId: number;
      filteredEntries: any[];
    }) => {
      console.log("Report created with ID:", reportId);
      setReportId(reportId);
      setEntries(filteredEntries);
      setVisibility("PUBLIC");
      setStartDate("");
      setEndDate("");
      setRenderFlag(true);
      setHeaderStartDate(startDate || "All Time");
      setHeaderEndDate(endDate || "Today");
      queryClient.invalidateQueries();
    },
    onError: (err: Error) => {
      console.error("Error creating report:", err);
      alert("Failed to create the report.");
    },
  });

  const handleCreateReport = () => {
    mutation.mutate();
  };

  if (!userId) {
    return <div className="container">Error: User ID not found...</div>;
  }

  return (
    <div className="container">
      <h2>Create Report</h2>
      <div>
        <p>
          Reports are aggregated collections of your diary entries over a span
          of time.
        </p>
        <p>
          To create one, select a start date and end date for the timespan you
          would like to see entries for.
        </p>
        <p>
          You can leave one or both fields blank, with starting date indicating
          over all time, and end date indicating today (inclusive).
        </p>
      </div>
      <br />
      {/* Visibility Dropdown */}
      <div className="visibility-dropdown">
        <label htmlFor="visibility">Visibility:</label>
        <select
          id="visibility"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
          <option value="FRIENDS">Friends</option>
        </select>
      </div>

      {/* Date Range Selector */}
      <div className="date-selector">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Create Button */}
      <button className="button button-create" onClick={handleCreateReport}>
        {"Create Report"}
      </button>

      {/* Status Messages */}
      {mutation.isError && (
        <p className="status-message status-error">
          Error: {mutation.error?.message}
        </p>
      )}
      {mutation.isSuccess && renderFlag && (
        <div>
          <button
            className="button button-clear"
            onClick={() => {
              setReportId(null);
              setEntries([]);
              setRenderFlag(false);
            }}
          >
            Clear Report
          </button>
          <p className="status-message status-success">
            Report created successfully!
          </p>
          <h2 className="report-header">
            Report {reportId}
            {headerStartDate || headerEndDate ? (
              <>
                {" "}
                ({headerStartDate} - {headerEndDate})
              </>
            ) : null}
          </h2>
          <h3>Diary Entries:</h3>
          <ul className="report-list">
            {entries.map((entry: any, index: number) => (
              <li key={index}>
                <strong>Date:</strong>{" "}
                {new Date(entry.Date).toLocaleDateString()} <br />
                <strong>Description:</strong> {entry.Description} <br />
                <strong>Visibility:</strong> {entry.Visibility}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDiaryReportCreate;
