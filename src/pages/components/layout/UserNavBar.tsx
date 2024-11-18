import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/components/layout/UserNavBar.css";
import { FaCog } from "react-icons/fa";

interface NavbarProps {
  userId: string;
}

const UserNavBar: React.FC<NavbarProps> = ({ userId }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMusicDropdownOpen, setMusicDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMusicDropdown = () => setMusicDropdownOpen(!isMusicDropdownOpen);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={`/user/${userId}/home`} className="navbar-link">
            Home
          </Link>
        </li>

        <li>
          <Link to={`/user/${userId}/entries`} className="navbar-link">
            Entries
          </Link>
        </li>

        <li
          className="dropdown"
          onMouseEnter={toggleMusicDropdown}
          onMouseLeave={toggleMusicDropdown}
        >
          <span>
            <Link to={`/user/${userId}/music/all`} className="navbar-link">
              All Music
            </Link>
          </span>
          {isMusicDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to={`/user/${userId}/music/songs`}
                className="dropdown-item"
              >
                Songs
              </Link>
              <Link
                to={`/user/${userId}/music/albums`}
                className="dropdown-item"
              >
                Albums
              </Link>
              <Link
                to={`/user/${userId}/music/artists`}
                className="dropdown-item"
              >
                Artists
              </Link>
            </div>
          )}
        </li>

        <li>
          <Link to={`/user/${userId}/reports`} className="navbar-link">
            Reports
          </Link>
        </li>

        <li>
          <Link to={`/user/${userId}/reviews`} className="navbar-link">
            Reviews
          </Link>
        </li>

        {/* Friends dropdown */}
        <li
          className="dropdown"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <span>
            <Link to={`/user/${userId}/friends`} className="navbar-link">
              Friends
            </Link>
          </span>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to={`/user/${userId}/friends/entries`}
                className="dropdown-item"
              >
                Entries
              </Link>
              <Link
                to={`/user/${userId}/friends/reports`}
                className="dropdown-item"
              >
                Reports
              </Link>
              <Link
                to={`/user/${userId}/friends/reviews`}
                className="dropdown-item"
              >
                Reviews
              </Link>
            </div>
          )}
        </li>
        <li className="navbar-settings">
          <Link to={`/user/${userId}/settings`} className="navbar-link">
            <FaCog size={20} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavBar;

