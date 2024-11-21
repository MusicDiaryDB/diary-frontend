import { diaryClient } from "../axios";

export interface DisplaySong {
  SongID: number;
  AlbumID: number;
  ArtistID: number;
  SongName: string;
  AlbumName: string;
  ArtistName: string;
}

export interface DisplayAlbum {
  AlbumID: number;
  ArtistID: number;
  AlbumName: string;
  ArtistName: string;
  SongCount: number;
}

export interface DisplayArtist {
  ArtistID: number;
  ArtistName: string;
  AlbumCount: number;
}

export const getAllSongs = async function (): Promise<DisplaySong[]> {
  try {
    const resp = await diaryClient.get(`/music/all/songs`);
    const res = resp.data.result;
    return res;
  } catch (error) {
    console.log("Error fetching music items:", error);
    throw error;
  }
};

export const getAllAlbums = async function (): Promise<DisplayAlbum[]> {
  try {
    const resp = await diaryClient.get(`/music/all/albums`);
    const res = resp.data.result;
    return res;
  } catch (error) {
    console.log("Error fetching music items:", error);
    throw error;
  }
};

export const getAllArtists = async function (): Promise<DisplayArtist[]> {
  try {
    const resp = await diaryClient.get(`/music/all/artists`);
    const res = resp.data.result;
    return res;
  } catch (error) {
    console.log("Error fetching music items:", error);
    throw error;
  }
};

export const addSong = async function (
  songName: string,
  albumName: string,
  artistName: string,
): Promise<void> {
  try {
    try {
      await diaryClient.get(`/artist/${artistName}`);
    } catch (error: any) {
      await diaryClient.post(`/artist/`, {
        name: artistName,
      });
    }

    try {
      await diaryClient.get(`/album/${albumName}`);
    } catch (error: any) {
      await diaryClient.post(`/album/${artistName}`, {
        name: albumName,
      });
    }

    const createSongResp = await diaryClient.post(`/song/${albumName}`, {
      name: songName,
    });
    console.log("Song added successfully:", createSongResp.data);
  } catch (error) {
    console.error("Error adding song:", error);
    throw error;
  }
};

export const createAlbum = async function (
  albumName: string,
  artistName: string,
): Promise<void> {
  if (!albumName.trim() || !artistName.trim()) {
    console.error("Album name and artist name cannot be empty.");
    throw new Error("Album name and artist name cannot be empty.");
  }

  try {
    try {
      await diaryClient.get(`/artist/${artistName}`);
    } catch (error: any) {
      await diaryClient.post(`/artist/`, {
        name: artistName,
      });
    }

    try {
      await diaryClient.get(`/album/${albumName}`);
      console.log(`Album "${albumName}" already exists.`);
    } catch (error: any) {
      const createAlbumResp = await diaryClient.post(`/album/${artistName}`, {
        name: albumName,
      });
      console.log(
        `Album "${albumName}" created successfully with ID: ${createAlbumResp.data.AlbumID}`,
      );
    }
  } catch (error) {
    console.error("Error creating album:", error);
    throw error;
  }
};

export const createArtist = async function (
  artistName: string,
): Promise<boolean> {
  try {
    let artistResp;
    try {
      artistResp = await diaryClient.get(`/artist/${artistName}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        const createArtistResp = await diaryClient.post(`/artist/`, {
          name: artistName,
        });
        return !(createArtistResp.data.ArtistID === true);
      } else {
        throw error;
      }
    }
    return !(artistResp.data.ArtistID === true);
  } catch (error) {
    console.error("Error creating artist:", error);
    throw error;
  }
};
