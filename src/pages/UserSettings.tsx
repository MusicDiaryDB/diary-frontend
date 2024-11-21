import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "../assets/css/pages/UserSettings.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePassword } from "../assets/services/diary/user";

const UserSettings: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleUpdatePassword = async () => {
    if (!userId) {
      toast.error("Invalid user ID", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    if (!oldPassword || !newPassword) {
      toast.error("Please provide both the current and new passwords", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    try {
      const response = await updatePassword({
        userId: Number(userId),
        oldPassword,
        newPassword,
      });

      if (response && response.status === 200) {
        toast.success("Password updated successfully! Redirecting...", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          onClose: () => navigate(`/user/${userId}/home`),
        });
        // Clear password fields after success
        setOldPassword("");
        setNewPassword("");
      } else {
        throw new Error("Failed to update password.");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error details:", error.response.data);
        if (error.response.data.error === "Incorrect old password") {
          toast.error("The current password is incorrect", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          toast.error("Failed to update password. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } else {
        console.error("Unknown error:", error);
        toast.error("Failed to update password. Please try again later.", {
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
    <div className="userSettingsPage">
      <h3>Update Password</h3>
      <TextField
        className="userSettingsField"
        label="Current Password"
        type="password"
        variant="outlined"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        className="userSettingsField"
        label="New Password"
        type="password"
        variant="outlined"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdatePassword}
        style={{ marginTop: "20px" }}
        fullWidth
      >
        Update Password
      </Button>

      <ToastContainer />
    </div>
  );
};

export default UserSettings;
