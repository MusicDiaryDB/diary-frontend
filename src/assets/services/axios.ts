import axios from "axios"
import React from "react"


export const geniusClient = axios.create({
    baseURL: process.env.REACT_APP_GENIUS_BASEURL,
    timeout: 10000,
    headers:
        {
            "Content-Type": "application/json",
"access-control-allow-origin" : "*"

        }
})

geniusClient.interceptors.request.use(
    function (config) {
        const token = sessionStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${process.env.REACT_APP_GENIUS_TOKEN}`
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

export const diaryClient = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000,
    headers:
        {
            "Content-Type": "multipart/form-data",
        }
})