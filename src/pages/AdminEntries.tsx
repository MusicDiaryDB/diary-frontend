import { useCallback, useEffect, useState } from "react";
import {
  deleteEntry,
  Entry,
  getAllEntries,
} from "../assets/services/diary/adminEntries";
import "../assets/css/pages/UserReports.css";

const AdminEntries: React.FC = function () {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingEntryId, setPendingEntryId] = useState<number | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      const res = await getAllEntries();
      setEntries(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteEntryHandler = (entryId: number) => {
    setShowConfirm(true);
    if (!deleteEntry(entryId)) {
      console.log("Failed to delete entry");
      return;
    }
    setPendingEntryId(entryId);
  };

  const confirmDeleteEntry = () => {
    if (pendingEntryId !== null) {
      setEntries(entries.filter((entry) => entry.EntryID !== pendingEntryId));
    }
    closeConfirm();
  };

  const closeConfirm = () => {
    setShowConfirm(false);
    setPendingEntryId(null);
  };

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div className="container">
      <h2>Entries</h2>
      <button className="button-submit" onClick={fetchEntries}>
        Refresh Entries
      </button>
      <div className="result-list">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.EntryID} className="result-container">
              <h3>
                Entry ID: <em>{entry.EntryID}</em>
              </h3>
              <strong>User ID:</strong> {entry.UserID}
              <br />
              <strong>Description:</strong> {entry.Description}
              <br />
              <strong>Visibility:</strong> {entry.Visibility}
              <br />
              <button
                className="delete-button"
                onClick={() => deleteEntryHandler(entry.EntryID)}
              >
                Delete Entry
              </button>
            </div>
          ))
        ) : (
          <p>No entries found.</p>
        )}
      </div>

      {showConfirm && (
        <div className="confirm">
          <div className="confirm-content">
            <p>Are you sure you want to delete this entry?</p>
            <button className="confirm-button" onClick={confirmDeleteEntry}>
              Yes
            </button>
            <button className="cancel-button" onClick={closeConfirm}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEntries;
