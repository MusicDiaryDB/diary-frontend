import { diaryClient } from "../axios";
import { User } from "../../models/user";
import {getSongDetials} from "../genius"
import {Album, Artist, Song } from "../../models/entry";




export const getArtistbyName = async(artistName:string) =>{
    try{
        const response = await diaryClient.get(`/artist/${artistName}`)
        return {
            artistName: response.data.Name,
            artistId: response.data.ArtistID
        }
    }catch (err) {
        console.error("Error getting artist by name", err)
        // throw err
    }
}


export const addArtist = async(artistName: string) =>  {
    try {
        const form = new FormData()
        form.append("name",artistName)
        const response = await diaryClient.post("/artist", form)
        return {artistId:response.data.ArtistID,artistName:artistName}
    } catch (err) {
        console.error("Error adding artist", err)
        throw err
    }
}

export const addAlbum = async(albumName: string, artistId:string) =>  {
    try {
        const form = new FormData()
        form.append("name",albumName)
        form.append("artistId",artistId)
        const response = await diaryClient.post("/album", form)
        return {albumId:response.data.AlbumID,albumName:albumName,artistId:artistId}
    } catch (err) {
        console.error("Error adding artist", err)
        throw err
    }
}

export const addSong = async(releaseDate: string, name :string, albumId: string) =>  {
    try {
        const form = new FormData()
        form.append("releaseDate",releaseDate)
        form.append("name",name)
        form.append("albumId",albumId)

        const response = await diaryClient.post("/song", form)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.error("Error adding song", err)
        throw err
    }
}

export const getAllSongsAlbumsArtists = async(tableName:string) => {

    const validTableNames : string[] = ["artist","album","song"]
    if (!validTableNames.includes(tableName)){
        console.error("invalid table name: " + tableName)
    }

    const response = await diaryClient.get(`/${tableName}/all`)

    if (tableName === validTableNames[0]){
        let songList: Song[] = []
        response.data.map((song:any)=>{
            songList = [...songList,{
                songId: song.SongID,
                releaseDate: song.ReleaseDate,
                name: song.Name
            }]
        })
        return songList
    }
    if (tableName === validTableNames[1]){
        let albumList: Album[] = []
        response.data.map((album:any)=>{
            albumList = [...albumList,{
                name:album.Name,
                artistId:album.ArtistID,
                albumId:album.AlbumID
            }]
        })
        return albumList
    }

    if (tableName === validTableNames[2]){
        let artistList: Artist[] = []
        response.data.map((artist:any)=>{
            artistList = [...artistList,{
                name:artist.Name,
                artistId:artist.ArtistID
            }]
        })
        return artistList
    }
}

export const getAlbumByName = async(albumName:string) =>{
    try{
        const response = await diaryClient.get(`/album/${albumName}`)
        return {
            albumName: response.data.Name,
            artistId: response.data.ArtistID,
            albumId: response.data.AlbumID
        }
    }catch (err) {
        console.error("Error getting artist by name", err)
        // throw err
    }
}

export const getSongByName = async(songName:string) =>{
    try{
        const response = await diaryClient.get(`/album/${songName}`)
        return {
            albumId: response.data.AlbumID,
            name: response.data.Name,
            releaseDate: response.data.ReleaseDate,
            songId: response.data.SongID
        }
    }catch (err) {
        console.error("Error getting artist by name", err)
        // throw err
    }
}

export const addNewSongFromGeniusSearch =  async(geniusSongId:number) =>{
    let isArtistMutated, isAlbumMutated, isSongMutated = false
    const geniusSongDetails = await getSongDetials(geniusSongId)
    try{
        let getArtistResponse = await getArtistbyName(geniusSongDetails.artist)

        if (!getArtistResponse){
            getArtistResponse = await addArtist(geniusSongDetails.artist)
            isArtistMutated = true;
        }
        try {

            let getAlbumResponse = undefined

            if (!isArtistMutated) {
                getAlbumResponse =  await getAlbumByName(geniusSongDetails.albumName)
            }

            if (!getAlbumResponse) {
                getAlbumResponse = await addAlbum(geniusSongDetails.albumName, getArtistResponse?.artistId)
                isAlbumMutated = true
            }

            try {
                let getSongResponse = undefined

                if (!isAlbumMutated) {
                    getSongResponse = await getSongByName(geniusSongDetails.title)
                }

                if (!getSongResponse){
                    getSongResponse = await addSong(geniusSongDetails.releaseDate,geniusSongDetails.title,getAlbumResponse.albumId)
                    isSongMutated = true
                }
            }catch (err) {
                console.error("Error adding song from search")
            }

            return {
                isSongMutated:isSongMutated,
                isArtistMutated:isArtistMutated,
                isAlbumMutated:isAlbumMutated
            }

        }catch (err) {

        }
    }catch (err) {

        console.error("Error getting artist detials from geni", err)
        throw err
    }
}