import { Song } from "../models/entry";
import { diaryClient } from "./axios";

export const getUserById = async() =>  {
    try {
        const response = await diaryClient.get("/user/1")
        console.log(response.data)
        return response.data
    } catch (err) {
        console.error("Error getting user", err)
        throw err
    }
}