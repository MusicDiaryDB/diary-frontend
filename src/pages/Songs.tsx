import React, { useEffect, useState, useCallback } from "react";
import "../assets/css/pages/UserReviews.css";
import { getAllSongs, DisplaySong } from "../assets/services/diary/music";

const SongsPage: React.FC = function () {
  const [music, setMusic] = useState<DisplaySong[]>([]);

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
    </div>
  );
};

export default SongsPage;
