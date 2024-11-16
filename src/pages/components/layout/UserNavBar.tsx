import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/components/layout/UserNavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faMusic, faHome } from '@fortawesome/free-solid-svg-icons';

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
            My Reports
          </Link>
        </li>

        <li>
          <Link to={`/${userId}/friends`} className="navbar-link">
            Friends List
          </Link>
        </li>
        <li>
          <Link to={`/${userId}/reviews`} className="navbar-link">
            My Reviews
          </Link>
        </li>
        {/* Friends dropdown */}
        <li className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <span className="navbar-link">Your Friends</span>
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
      <div className="action-buttons">
        {/* Button for making a Diary Entry (left-aligned) */}
        <Link to={`/${userId}/reports/new`} className="action-button diary-entry">
          <FontAwesomeIcon icon={faPencilAlt} className="icon" />
          Generate your Song Report 
        </Link>
        {/* Home icon link at the bottom */}
        <div className="home-icon">
            <Link to={`/${userId}/home`} className="navbar-link home-link">
                <FontAwesomeIcon icon={faHome} className="icon" />
            </Link>
        </div>
        {/* Button for making a Song Review (right-aligned) */}
        <Link to={`/${userId}/review/new`} className="action-button song-review">
          <FontAwesomeIcon icon={faMusic} className="icon" />
          Make a Song Review
        </Link>
      </div>
      
    </nav>
  );
};

export default UserNavBar;
