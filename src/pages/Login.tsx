import { useNavigate } from "react-router-dom";
import { Button, TextField, Modal, Box } from "@mui/material";
import "../assets/css/pages/Login.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { diaryClient } from "../assets/services/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(username);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    diaryClient
      .post("/login", formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("User found, logging in");
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("user_id", res.data.user_id);
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("isAdmin", res.data.is_admin ? "true" : "false");

          // Redirect user to their specific home page
          const userId = res.data.user_id;
          navigate(`/user/${userId}/home`);
        }
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.error;

          // Displaying different error messages depending on the error
          if (errorMessage === "Invalid Username") {
            toast.error("Invalid username", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else if (errorMessage === "Invalid Password") {
            toast.error("Incorrect password", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else {
            toast.error("Invalid username or password", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        } else {
          // Generic error message if there was no response from the backend
          toast.error("Login failed. Please try again later.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      });
  };

  const toggleAdminModal = () => {
    setIsAdminModalOpen(!isAdminModalOpen);
  };

  // Handle Admin Login logic with error handling
  const handleAdminLogin = () => {
    console.log("Attempting admin login...");

    const formData = new FormData();
    formData.append("username", adminUsername);
    formData.append("password", adminPassword);

    diaryClient
      .post("/login", formData)
      .then((res) => {
        if (res.status === 200 && res.data.is_admin) {
          sessionStorage.setItem("username", adminUsername);
          sessionStorage.setItem("user_id", res.data.user_id);
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("isAdmin", "true");
          navigate("/manage");
        } else {
          toast.error("Admin credentials are invalid", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.error;

          // Displaying different error messages depending on the error
          toast.error("Invalid Username or Password", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          // Generic error message if there was no response from the backend
          toast.error("Admin login failed. Please try again later.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      });
  };

  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className="loginPage">
      <TextField
        className="loginField"
        id="standard-basic"
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="user-password"
        variant="standard"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="loginField"
        variant="contained"
        onClick={handleLogin}
      >
        Login
      </Button>

      <Button
        className="registerField"
        variant="contained"
        onClick={handleRegistration}
      >
        Register
      </Button>

      <Button
        className="adminLoginButton"
        onClick={toggleAdminModal}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#f50057",
          color: "white",
        }}
      >
        Admin Login
      </Button>

      {/* Admin Login Modal */}
      <Modal
        open={isAdminModalOpen}
        onClose={toggleAdminModal}
        aria-labelledby="admin-login-modal"
        aria-describedby="admin-login-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="admin-login-modal">Admin Login</h2>
          <TextField
            label="Admin Username"
            fullWidth
            margin="normal"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
          />
          <TextField
            label="Admin Password"
            type="password"
            fullWidth
            margin="normal"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleAdminLogin}
            style={{ marginTop: "20px" }}
          >
            Admin Login
          </Button>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default Login;

