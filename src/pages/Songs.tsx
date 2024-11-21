import React, { useEffect, useState, useCallback } from "react";
import "../assets/css/pages/UserReviews.css";
import {
  getAllSongs,
  DisplaySong,
  addSong,
} from "../assets/services/diary/music";

const SongsPage: React.FC = function () {
  const [music, setMusic] = useState<DisplaySong[]>([]);
  const [songName, setSongName] = useState<string>("");
  const [albumName, setAlbumName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");

  const handleCreateSong = async () => {
    if (!songName.trim() || !albumName.trim() || !artistName.trim()) {
      alert("Song name, album name, and artist name cannot be empty");
      return;
    }
    try {
      await addSong(songName, albumName, artistName);
      setSongName("");
      setAlbumName("");
      setArtistName("");
      fetchMusic();
    } catch (error) {
      console.error("Error adding song:", error);
      alert("Failed to add song. Please try again.");
    }
  };

  const fetchMusic = useCallback(async () => {
    try {
      const res = await getAllSongs();
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
      <h2>All Songs</h2>
      <button className="button-submit" onClick={fetchMusic}>
        Refresh Songs
      </button>
      <div className="result-list">
        {music.length > 0 ? (
          music.map((m) => (
            <div key={m.SongID} className="result-container">
              <h3>
                Song: <em>{m.SongName}</em>
              </h3>
              <strong>Artist: {m.ArtistName}</strong>
              <br />
              <strong>Album: {m.AlbumName}</strong>
            </div>
          ))
        ) : (
          <p>No songs found.</p>
        )}
      </div>
      <div className="create-container">
        <h3>Add New Song</h3>
        <input
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder="Enter song name"
          className="input-field"
        />
        <input
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          placeholder="Enter album name"
          className="input-field"
        />
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Enter artist name"
          className="input-field"
        />
        <button className="button-create" onClick={handleCreateSong}>
          Add Song
        </button>
      </div>
    </div>
  );
};

export default SongsPage;
