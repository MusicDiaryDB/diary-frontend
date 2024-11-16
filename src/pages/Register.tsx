import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "../assets/css/pages/Register.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser, getUserByUsername } from "../assets/services/diary/user";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // Registration logic
  const handleRegistration = () => {
    // Validate fields
    if (!username || !password || !confirmPassword) {
      toast.error("Please fill out all fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    // First, check if the username is already taken
    getUserByUsername(username)
      .then((res) => {
        // If the user exists
        if (res) {
          toast.error("Username already taken", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // If the username doesn't exist
          createUser(username, password, "public", false)
            .then((res) => {
              if (res.status === 201) {
                toast.success("Registration successful! Redirecting to login...", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                });

                // Wait a moment to let the user see the success toast and then navigate to login
                setTimeout(() => {
                  navigate("/"); // Redirect to login page
                }, 1500);
              }
            })
            .catch((error) => {
              console.error("Error creating user", error);
              toast.error("Registration failed. Please try again later.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            });
        } else {
          // Handle any unexpected error from `getUserByUsername`
          console.error("Error checking username availability", error);
          toast.error("Error checking username availability. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      });
  };

  // Navigate to login page
  const handleNavigateToLogin = () => {
    navigate("/"); // Redirect to login page at "/"
  };

  return (
    <div className="registerPage">
      <TextField
        className="registerField"
        id="username"
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        className="registerField"
        id="password"
        variant="standard"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        className="registerField"
        id="confirm-password"
        variant="standard"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        className="registerButton"
        variant="contained"
        onClick={handleRegistration}
      >
        Register
      </Button>

      <Button
        className="loginNavigateButton"
        onClick={handleNavigateToLogin}
      >
        Return to Login
      </Button>
      
      <ToastContainer />
    </div>
  );
}

export default Register;
