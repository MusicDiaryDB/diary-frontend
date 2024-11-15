import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/components/UserNavBar.css';

interface NavbarProps {
  userId: string;
}

const UserNavBar: React.FC<NavbarProps> = ({ userId }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={`/${userId}/reports`} className="navbar-link">
            Reports
          </Link>
        </li>
        <li>
          <Link to={`/${userId}/friends/entries`} className="navbar-link">
            Friends' Entries
          </Link>
        </li>
        <li>
          <Link to={`/${userId}/friends/reports`} className="navbar-link">
            Friends' Reports
          </Link>
        </li>
        <li>
          <Link to={`/${userId}/friends`} className="navbar-link">
            Friends List
          </Link>
        </li>
        <li>
          <Link to={`/${userId}/reviews`} className="navbar-link">
            Reviews
          </Link>
        </li>
        <li>
          <Link to={`/${userId}/friends/reviews`} className="navbar-link">
            Friends' Reviews
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavBar;
