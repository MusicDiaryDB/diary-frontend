import {apiClient} from "./axios"

export const getRandomSong = async() => {
    try {
        const response = await apiClient.post("/auth/jwt/create", { username: uid, password: pass })
        sessionStorage.setItem("token", response.data.access)
        return response.data
    } catch (err) {
        console.error("Error logging in", err)
        throw err
    }
}