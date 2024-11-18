import React, { useEffect, useState, useCallback } from "react";
import "../assets/css/pages/UserReviews.css";
import {
  getAllArtists,
  DisplayArtist,
  createArtist,
} from "../assets/services/diary/music";

const ArtistsPage: React.FC = function () {
  const [music, setMusic] = useState<DisplayArtist[]>([]);

  const [artistName, setArtistName] = useState<string>("");

  const handleCreateArtist = async () => {
    if (!artistName.trim()) {
      alert("Artist name cannot be empty");
      return;
    }
    await createArtist(artistName);
    setArtistName("");
    fetchMusic();
  };

  const fetchMusic = useCallback(async () => {
    try {
      const res = await getAllArtists();
      setMusic(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMusic();
  }, [fetchMusic]);

  return (
    <div className="container">
      <h2>All Artists</h2>
      <button className="button-submit" onClick={fetchMusic}>
        Refresh artists
      </button>
      <div className="result-list">
        {music.length > 0 ? (
          music.map((m) => (
            <div key={m.ArtistID} className="result-container">
              <h3>
                Artist: <em>{m.ArtistName}</em>
              </h3>
              <strong>Album Count: {m.AlbumCount}</strong>
            </div>
          ))
        ) : (
          <p>No artists found.</p>
        )}
      </div>
      <div className="create-container">
        <h3>Create New Artist</h3>
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Enter artist name"
          className="input-field"
        />
        <button className="button-create" onClick={handleCreateArtist}>
          Create Artist
        </button>
      </div>
    </div>
  );
};

export default ArtistsPage;
