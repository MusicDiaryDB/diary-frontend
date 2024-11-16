import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/components/AdminNavBar.css';

const AdminNavBar: React.FC = () => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <Link to="/users" className="admin-navbar-link">
            Users
          </Link>
        </li>
        <li>
          <Link to="/songs_albums" className="admin-navbar-link">
            Song Albums
          </Link>
        </li>
        <li>
          <Link to="/reviews" className="admin-navbar-link">
            Reviews
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
      </ul>
    </nav>
  );
};

export default AdminNavBar;
