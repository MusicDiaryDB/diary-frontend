import React, { useEffect, useState, useCallback } from "react";
import "../assets/css/pages/UserReviews.css";
import { getAllArtists, DisplayArtist } from "../assets/services/diary/music";

const ArtistsPage: React.FC = function () {
  const [music, setMusic] = useState<DisplayArtist[]>([]);

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
        Refresh albums
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
          <p>No albums found.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistsPage;
