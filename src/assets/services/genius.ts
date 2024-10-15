import {geniusClient} from "./axios"

export const getRandomSong = async() => {
    try {
        const response = await geniusClient.get("/songs/43431")
        console.log(response.data)
        return response.data
    } catch (err) {
        console.error("Error logging in", err)
        throw err
    }
}