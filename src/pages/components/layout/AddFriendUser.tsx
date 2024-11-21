import React, { useState, useEffect } from "react";
import "../../../assets/css/components/layout/AddUser.css";
import { addFriend } from "../../../assets/services/adduser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

interface AddFriendUserProps {
  userId: number;
}

const AddFriendUser: React.FC<AddFriendUserProps> = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddFriend = async () => {
    if (!userId) {
      setErrorMessage("Unable to add a friend: User not authenticated.");
      return;
    }

    if (!username.trim()) {
      setErrorMessage("Username cannot be empty.");
      return;
    }

    try {
      const response = await addFriend(userId, username);
      if (response.success) {
        setSuccessMessage(`User '${username}' added successfully.`);
        setUsername("");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(response.error || "Failed to add user.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the user.");
    }
  };

  return (
    <div>
      <button className="add-friend-btn" onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon icon={faUserPlus} className="icon" />
        {"     "}Add Friend
      </button>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
        ></div>
      )}
      {isModalOpen && (
        <div className="add-user-modal show">
          <div className="modal-header">Add Friend</div>

          <input
            type="text"
            id="username"
            placeholder="Enter friend's username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="add-user-input"
          />

          <button onClick={handleAddFriend} className="submit-user-btn">
            Add Friend
          </button>

          {/* Error or Success Messages */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddFriendUser;
