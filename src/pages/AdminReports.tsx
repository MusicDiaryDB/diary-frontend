import { useCallback, useEffect, useState } from "react";
import {
  deleteReport,
  getAllReports,
  DiaryReport,
} from "../assets/services/diary/adminReports";
import "../assets/css/pages/UserReports.css";

const AdminReports: React.FC = function () {
  const [reports, setReports] = useState<DiaryReport[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingReportId, setPendingReportId] = useState<number | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      const res = await getAllReports();
      setReports(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteReportHandler = (reportId: number) => {
    setShowConfirm(true);
    if (!deleteReport(reportId)) {
      console.log("Failed to delete report");
      return;
    }
    setPendingReportId(reportId);
  };

  const confirmDeleteReport = () => {
    if (pendingReportId !== null) {
      setReports(
        reports.filter((report) => report.ReportID !== pendingReportId),
      );
    }
    closeConfirm();
  };

  const closeConfirm = () => {
    setShowConfirm(false);
    setPendingReportId(null);
  };

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="container">
      <h2>Reports</h2>
      <button className="button-submit" onClick={fetchReports}>
        Refresh Reports
      </button>
      <div className="result-list">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.ReportID} className="result-container">
              <h3>
                Report ID: <em>{report.ReportID}</em>
              </h3>
              <strong>User ID:</strong> {report.UserID}
              <br />
              <strong>Description:</strong> {report.Description}
              <br />
              <strong>Visibility:</strong> {report.Visibility}
              <br />
              <button
                className="delete-button"
                onClick={() => deleteReportHandler(report.ReportID)}
              >
                Delete Report
              </button>
            </div>
          ))
        ) : (
          <p>No reports found.</p>
        )}
      </div>

      {showConfirm && (
        <div className="confirm">
          <div className="confirm-content">
            <p>Are you sure you want to delete this report?</p>
            <button className="confirm-button" onClick={confirmDeleteReport}>
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

export default AdminReports;
