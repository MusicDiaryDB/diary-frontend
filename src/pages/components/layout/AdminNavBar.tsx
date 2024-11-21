import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/components/AdminNavBar.css";

const AdminNavBar: React.FC = () => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <Link to="/admin/manage/users" className="admin-navbar-link">
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin/manage/songs_albums" className="admin-navbar-link">
            Song Albums
          </Link>
        </li>
        <li>
          <Link to="/admin/manage/reviews" className="admin-navbar-link">
            Reviews
          </Link>
        </li>
        <li>
          <Link to="/admin/manage/entries" className="admin-navbar-link">
            Entries
          </Link>
        </li>
        <li>
          <Link to="/admin/manage/reports" className="admin-navbar-link">
            Reports
          </Link>
        </li>
        <li>
          <Link to="/admin/info-metrics" className="admin-navbar-link">
            Info Metrics
          </Link>
        </li>
        <li>
          <Link to="/admin/aggregate-metrics" className="admin-navbar-link">
            Aggregate Metrics
          </Link>
        </li>
        <li>
          <Link to="/admin/aggregate-graphs" className="admin-navbar-link">
            Aggregate Graphs
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
