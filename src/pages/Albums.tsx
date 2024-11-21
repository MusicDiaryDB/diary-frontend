import React, { useEffect, useState, useCallback } from "react";
import "../assets/css/pages/UserReviews.css";
import {
  getAllAlbums,
  DisplayAlbum,
  createAlbum,
} from "../assets/services/diary/music";

const AlbumsPage: React.FC = function () {
  const [music, setMusic] = useState<DisplayAlbum[]>([]);

  const [albumName, setAlbumName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");

  const handleCreateAlbum = async () => {
    if (!albumName.trim() || !artistName.trim()) {
      alert("Album name and artist name cannot be empty");
      return;
    }
    try {
      await createAlbum(albumName, artistName);
      setAlbumName("");
      setArtistName("");
      fetchMusic();
    } catch (error) {
      console.error("Error creating album:", error);
      alert("Failed to create album. Please try again.");
    }
  };

  const fetchMusic = useCallback(async () => {
    try {
      const res = await getAllAlbums();
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
      <h2>All Albums</h2>
      <button className="button-submit" onClick={fetchMusic}>
        Refresh albums
      </button>
      <div className="result-list">
        {music.length > 0 ? (
          music.map((m) => (
            <div key={m.AlbumID} className="result-container">
              <h3>
                Album: <em>{m.AlbumName}</em>
              </h3>
              <strong>Artist: {m.ArtistName}</strong>
              <br />
              <strong>Song Count: {m.SongCount}</strong>
            </div>
          ))
        ) : (
          <p>No albums found.</p>
        )}
      </div>
      <div className="create-container">
        <h3>Create New Album</h3>
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
        <button className="button-create" onClick={handleCreateAlbum}>
          Create Album
        </button>
      </div>
    </div>
  );
};

export default AlbumsPage;
