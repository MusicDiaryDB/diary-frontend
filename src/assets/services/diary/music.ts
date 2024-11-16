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
