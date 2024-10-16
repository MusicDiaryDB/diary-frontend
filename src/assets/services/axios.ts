import axios from "axios"
import React from "react"
import { Navigate } from "react-router-dom"


export const geniusClient = axios.create({
    baseURL: process.env.REACT_APP_GENIUS_BASEURL,
    timeout: 10000,
    headers:
        {
            "Content-Type": "application/json"
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
    baseURL: process.env.REACT_APP_DIARY_BASEURL,
    timeout: 10000,
    headers:
        {
            "Content-Type": "application/json"
        }
})

// diaryClient.interceptors.request.use(
//     function (config) {
//         // const token = sessionStorage.getItem("token")
//         // if (token) {
//         //     config.headers.Authorization = `Bearer ${process.env.REACT_APP_GENIUS_TOKEN}`
//         // }
//         return config
//     },
//     function (error) {
//         return Promise.reject(error)
//     }
// )