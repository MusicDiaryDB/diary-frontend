import "../../../assets/css/components/layout/AppHeader.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import the icon
import logo1 from "../../../assets/images/Logo1.png";  // Default Logo
import logo2 from "../../../assets/images/Logo2.png";  // User Logo
import logo3 from "../../../assets/images/Logo3.png";  // Admin Logo

function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the logo based on the current URL
  const getLogo = () => {
    // Check if the path contains '/manage', '/users', '/songs_albums', '/admin', or '/reviews'
    if (location.pathname.includes('/manage') || 
        location.pathname.includes('/users') || 
        location.pathname.includes('/songs_albums') || 
        location.pathname.includes('/admin') || 
        location.pathname === '/reviews') {
      return logo2; 
    }
    // Check if the path contains a user ID (e.g., '/1/home', '/123/profile')
    else if (/\/\d+\//.test(location.pathname)) {
      return logo3; 
    }
    return logo1; 
  };

  return (
    <header>
      {/* Header Content */}
      <div className="header-content">
        <div 
          className="logo-title"
          onClick={() => navigate("/")} 
          style={{ cursor: "pointer" }}
        >
          <img src={getLogo()} alt="Music Diary Logo" className="logo" />
          <p className="title">MusicDiary</p>
        </div>
        {/* Logout */}
        <p
          onClick={() => {
            sessionStorage.setItem("username", "");
            navigate("/Login/"); 
          }}
          style={{ cursor: "pointer" }}
          className="logout"
        >
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '5px' }} />
          Logout
        </p>
      </div>
    </header>
  );
}

export default AppHeader;
