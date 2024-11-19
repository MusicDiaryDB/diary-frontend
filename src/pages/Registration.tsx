import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser, getUserByUsername } from "../assets/services/diary/user";
import "../assets/css/pages/Registration.css";

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("public");
  const [isAdmin] = useState<boolean | null>(false);

  const handleRegistration = async () => {
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

    try {
      // Check if username already exists
      await getUserByUsername(username);
      // If we get here, the username exists
      toast.error("Username already exists. Please choose another one.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        // Username does not exist, proceed with registration
        try {
          const createResponse = await createUser(username, password, visibility, isAdmin);
          if (createResponse) {
            toast.success("Registration successful! Redirecting to login...", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              onClose: () => navigate("/login"),
            });
            // Clear fields after success
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setVisibility("public");
          }
        } catch (registrationError) {
          console.error("Error during registration:", registrationError);
          toast.error("Registration failed. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } else {
        console.error("Error getting user by username:", error);
        toast.error("Failed to check username availability. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    }
  };

  return (
    <div className="registration-container">
      <h3>Register</h3>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel id="visibility-label">Visibility</InputLabel>
        <Select
          labelId="visibility-label"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          label="Visibility"
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
          <MenuItem value="friends">Friends Only</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegistration}
        style={{ marginTop: "20px" }}
        fullWidth
      >
        Register
      </Button>

      <ToastContainer />
    </div>
  );
};

export default Registration;
