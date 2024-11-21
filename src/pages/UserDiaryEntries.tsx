import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/pages/UserReviews.css";
import {
  DisplayEntry,
  getUserDiaryEntriesDisplay,
} from "../assets/services/diary/userDiaryEntries";

const UserDiaryEntries: React.FC = function () {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [displayEntries, setDisplayEntries] = useState<DisplayEntry[]>([]);

  const fetchEntries = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await getUserDiaryEntriesDisplay(Number(userId));
      setDisplayEntries(res);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching report:", error);
      setIsError(true);
      setIsLoading(false);
      return;
    }
  }, [userId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  if (isLoading) {
    return <div className="container">Loading report...</div>;
  }

  if (isError) {
    return <div className="container">Error: Failed to load entries.</div>;
  }

  return (
    <div className="container">
      <h2>Your Entries</h2>
      {displayEntries.length !== 0 ? (
        <div>
          <h3>Report Entries:</h3>
          <button
            className="button-common button-submit"
            onClick={fetchEntries}
          >
            Refresh Reports
          </button>
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
        <h3 className="empty-result">No entries found.</h3>
      )}
    </div>
  );
};

export default UserDiaryEntries;
