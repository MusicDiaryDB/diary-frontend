import axios from "axios"

// GENIUS API CLIENT

export const geniusClient = axios.create({
    baseURL: "https://genius-song-lyrics1.p.rapidapi.com/",
    timeout: 10000,
    headers:
        {
            'x-rapidapi-key': '7df705bb7bmsh489ff2f2d034e17p154d36jsn14374f2eb023',
            'x-rapidapi-host': 'genius-song-lyrics1.p.rapidapi.com'
        }
})

//DIARY API CLIENT
export const diaryClient = axios.create({
    baseURL: "http://localhost:5400",
    timeout: 10000,
    headers:
        {
            "Content-Type": "multipart/form-data",
        }
})