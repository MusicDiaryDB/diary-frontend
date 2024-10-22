import { Song } from "../models/entry";
import { diaryClient } from "./axios";

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


export const createUser = async(username: string, visibility :string) =>  {
    try {
        const form = new FormData()
        form.append("username",username)
        form.append("visibility",visibility)
        console.log(form)

        const response = await diaryClient.post("/user", form)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.error("Error creating user", err)
        throw err
    }
}