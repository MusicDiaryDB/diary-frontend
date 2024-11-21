import {PossibleSong} from "../../models/entry";
import {diaryClient} from "../axios";
import {getSongDetials} from "../genius";
import {addAlbum, addArtist, addSong, getAlbumByName, getArtistbyName, getSongByName} from "./song";

const getAllSongDetails = async (possibleSongs: PossibleSong[]) => {
    let deets: any[] = []
    for (let i = 0; i < possibleSongs.length; i++) {
        const response = await getSongDetials(possibleSongs[i].geniusSongId)
        deets.push(response)
    }
    return deets
}

const getSongsAlreadyStored = async (songDetails: SongDetail[]) => {
    let songIds: string[] = []
    let songsNotStored: SongDetail[] = []
    console.log("already stored")
    for (let i = 0; i < songDetails.length; i++) {
        const response = await getSongByName(songDetails[i].title)
        if (response) {
            songIds.push(response.songId)
        } else {
            songsNotStored.push(songDetails[i])
        }
    }
    return {songIds, songsNotStored}
}

const addNewSongs = async (songIds: string[], songsNotStored: SongDetail[]) => {
    let ids = [...songIds]
    for (let i = 0; i< songsNotStored.length;i++){

        const response = await addSongProperlyWithGeniusDetials(songsNotStored[i])
        // @ts-ignore
        ids.push(response.songId)
    }

    return ids;
}



export interface DiaryEntry {
  EntryID: number;
  Date: string;
  Description: string;
  UserID: number;
  SongID: number;
}

export interface DisplayEntry {
  EntryID: number;
  Date: string;
  Description: string;
  SongName: string;
  AlbumName: string;
  ArtistName: string;
  Visibility: string;
}

export const getUserDiaryEntriesDisplay = async function (
  userId: number,
): Promise<DisplayEntry[]> {
  try {
    const resp = await diaryClient.get(`/entries/user/${userId}`);
    return resp.data.result;
  } catch (error) {
    console.log("Error fetching entries for user with id: ", userId, error);
    throw error;
  }
};

export const getDiaryEntryById = async function (
  entryId: number,
): Promise<DiaryEntry> {
  try {
    const resp = await diaryClient.get(`/entry/${entryId}`);
    return resp.data.result;
  } catch (error) {
    console.log("Error fetching entry with id: ", entryId, error);
    throw error;
  }
};

interface SongDetail {
    title: any;
    artist: any;
    albumName: any;
    releaseDate: any;
}

export const makeEntries = async (
    possibleSongs: PossibleSong[],
    description: string,
    visibility: string
) => {
    
    const userId: string = sessionStorage.getItem("user_id") || ""

    //get all song details from genius
    getAllSongDetails(possibleSongs)
        .then((songDetails) => {
            console.log(songDetails)
            console.log("entering")
            // @ts-ignore
            getSongsAlreadyStored(songDetails)
                .then((response) => {
                    console.log(response)
                    addNewSongs(response.songIds, response.songsNotStored)
                        .then(async (songIds) => {
                            for (let i = 0; i < songIds.length; i++) {
                                const form = new FormData()
                                form.append("date", new Date().toJSON().slice(0, 10))
                                form.append("description", description)
                                form.append("visibility", visibility)
                                // @ts-ignore
                                form.append("userId", userId)
                                form.append("songId", songIds[i])
                                // const response =
                                    await diaryClient.post("/entry", form)
                            }
                        })
                })
        })
}

export const getUserDiaryEntries = async function (
    userId: number,
    startDate: string | null,
    endDate: string | null,
) {

  let entries;

  try {
    // Fetch user entries
    const resp = await diaryClient.get(`/entry/user/${userId}`);
    entries = resp.data.result;
  } catch (error) {
    console.log("Error fetching user entries:", error);
    throw error;
  }

  // Filter entries by date range
  if (!startDate) return entries;

  const ed = endDate ? endDate : new Date();
  console.log(entries, new Date(startDate), ed, new Date(entries[0].date));

  return entries.filter((entry: DiaryEntry) => {
    const entryDate = new Date(entry.Date);
    return entryDate >= new Date(startDate) && entryDate <= ed;
  });
};

export const getUserDiaryEntryIDs = function (entries: DiaryEntry[]) {
  return entries.map((entry: DiaryEntry) => entry.EntryID);

};

export const addSongProperlyWithGeniusDetials = async (songDetails: {
    title: any;
    artist: any;
    albumName: any;
    releaseDate: any;
}) => {
    let isArtistMutated, isAlbumMutated, isSongMutated = false
    let songId = ""
    // const geniusSongDetails = await getSongDetials(geniusSongId)
    try {
        let getArtistResponse = await getArtistbyName(songDetails.artist)

        if (!getArtistResponse) {
            getArtistResponse = await addArtist(songDetails.artist)
            isArtistMutated = true;
        }
        try {

            let getAlbumResponse = undefined

            if (!isArtistMutated) {
                getAlbumResponse = await getAlbumByName(songDetails.albumName)
            }

            if (!getAlbumResponse) {
                getAlbumResponse = await addAlbum(songDetails.albumName, getArtistResponse?.artistId)
                isAlbumMutated = true
            }

            try {
                let getSongResponse = undefined

                if (!isAlbumMutated) {
                    console.log("here")
                    getSongResponse = await getSongByName(songDetails.title)
                }

                console.log(getSongResponse)

                if (!getSongResponse) {
                    getSongResponse = await addSong(songDetails.releaseDate, songDetails.title, getAlbumResponse.albumId)
                    isSongMutated = true
                    songId = getSongResponse.SongID
                }
            } catch (err) {
                console.error("Error adding song from search")
            }

            return {
                isSongMutated: isSongMutated,
                isArtistMutated: isArtistMutated,
                isAlbumMutated: isAlbumMutated,
                songId: songId
            }

        } catch (err) {

        }
    } catch (err) {

        console.error("Error getting artist detials from genius", err)
        throw err
    }
}


