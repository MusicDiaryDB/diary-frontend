import axios from "axios"
import React from "react"
import { Navigate } from "react-router-dom"


export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_GENIUS_BASEURLgit ,
    timeout: 10000,
    headers:
        {
            "Content-Type": "application/json"
        }
})

apiClient.interceptors.request.use(
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