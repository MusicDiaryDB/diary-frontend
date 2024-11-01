import { diaryClient } from "../axios";
import { User } from "../../models/user";
import {getSongDetials} from "../genius"




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
        return response.data.ArtistID
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
        return response.data.AlbumID
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

export const getAllUsers = async () => {
    try {
        const users: User[] = []
        const response = await diaryClient.get(`/user/all`)

        response.data.map((user: User) => users.push({
            UserID: user.UserID,
            Username: user.Username,
            Visibility: user.Visibility
        }))
        return users
    }catch (err) {
        console.error("Error creating user", err)
        throw err
    }
}

export const getUserById = async(userId:number) =>  {
    try {
        const response = await diaryClient.get(`/user/${userId}`)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.error("Error getting user by id", err)
        throw err
    }
}


export const getUserByUsername = async(username:string) =>  {
    try {
        const response = await diaryClient.get(`/user/${username}`)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.error("Error getting user by username", err)
        throw err
    }
}

export const updateUser = async (userData : User) => {
    try {
        const form = new FormData()
        form.append("userId",userData.UserID.toString())
        form.append("username",userData.Username)
        form.append("visibility",userData.Visibility)
        console.log(form)

        const response = await diaryClient.put(`/user/${userData.UserID}`,form)
        return response.status === 200
    }catch (err) {
        console.error("Error updating user",err)
        throw err
    }
}

export const deleteUser = async (userId : number) => {
    try {
        const response = await diaryClient.delete(`/user/${userId.toString()}`)
        return response.status === 200
    }catch (err) {
        console.error("Error updating user",err)
        throw err
    }
}


export const addNewSongFromGeniusSearch =  async(geniusSongId:number) =>{
    const geniusSongDetails = await getSongDetials(geniusSongId)
    try{
        let getArtistResponse = await getArtistbyName(geniusSongDetails.artist)

        if (!getArtistResponse){
            getArtistResponse = await addArtist(geniusSongDetails.artist)
        }
        try {
            const addAlbumResponse = await addAlbum(geniusSongDetails.albumName, getArtistResponse?.artistId)

            //todo get album by name

            const addSongResponse = await addSong(geniusSongDetails.releaseDate,geniusSongDetails.title,addAlbumResponse)
            return addSongResponse.data.status == 201
        }catch (err) {

        }
    }catch (err) {

        console.error("Error getting artist detials from geni", err)
        throw err
    }
}