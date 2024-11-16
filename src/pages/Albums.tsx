import React, { useEffect, useState, useCallback } from "react";
import "../assets/css/pages/UserReviews.css";
import { getAllAlbums, DisplayAlbum } from "../assets/services/diary/music";

const AlbumsPage: React.FC = function () {
  const [music, setMusic] = useState<DisplayAlbum[]>([]);

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
    </div>
  );
};

export default AlbumsPage;
