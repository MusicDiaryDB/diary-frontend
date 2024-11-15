import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/components/UserNavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faMusic } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  userId: string;
}

const UserNavBar: React.FC<NavbarProps> = ({ userId }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={`/${userId}/reports`} className="navbar-link">
            Your Diary Entries
          </Link>
        </li>
        <li>
          <Link to={`/${userId}/friends`} className="navbar-link">
            Your Friends
          </Link>
        </li>
        <li>
          <Link to={`/${userId}/reviews`} className="navbar-link">
            Your Reviews
          </Link>
        </li>
        {/* Friends dropdown */}
        <li className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <span className="navbar-link">Friends</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to={`/${userId}/friends/entries`} className="dropdown-item">
                Entries
              </Link>
              <Link to={`/${userId}/friends/reports`} className="dropdown-item">
                Reports
              </Link>
              <Link to={`/${userId}/friends/reviews`} className="dropdown-item">
                Reviews
              </Link>
            </div>
          )}
        </li>
      </ul>
      {/* Button for making a Diary Entry */}
      <div className="action-buttons">
        <Link to={`/${userId}/reports/new`} className="action-button diary-entry">
        <FontAwesomeIcon icon={faPencilAlt} className="icon" />
          Create a New Diary Entry
        </Link>
        <Link to={`/${userId}/review/new`} className="action-button song-review">
        <FontAwesomeIcon icon={faMusic} className="icon" />

          Create a New Song Review
        </Link>
      </div>
    </nav>
  );
};

export default UserNavBar;
