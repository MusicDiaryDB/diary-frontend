import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createUserReview } from "../assets/services/diary/userReviews";
import "../assets/css/pages/UserReviewCreate.css";

const UserReviewCreate: React.FC = function () {
  const { userId } = useParams<{ userId: string }>();

  const [contents, setContents] = useState("");
  const [songName, setSongName] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [visibility, setVisibility] = useState("public");

  const handleSubmit = async () => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await createUserReview(
        contents,
        songName,
        parseInt(userId),
        visibility,
      );
      setResult(response.review);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const handleClear = () => {
    setContents("");
    setSongName("");
    setResult(null);
  };

  return (
    <div className="container">
      <h2>Create Song Review</h2>
      <div>
        <p>
          To create a review, enter a song name, your thoughts on it, and choose
          a visibility status.
        </p>
      </div>
      <div>
        <label>
          Song Name:
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Contents:
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Visibility:
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>
      </div>
      <div>
        <button className="button-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {result && (
        <div className="result-container">
          <h3>Review Created:</h3>
          <ul className="report-list">
            <li>
              <strong>Song Name:</strong> {result.SongName}
              <br />
              <strong>Contents:</strong> {result.Contents}
              <br />
              <strong>Visibility:</strong> {result.Visibility}
            </li>
          </ul>
          <button className="button-clear" onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserReviewCreate;
