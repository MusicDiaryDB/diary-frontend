import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Button, TextField } from '@mui/material';
import "../assets/css/pages/Login.css"
import { useState } from 'react';


function Login(){

    const [username, setUsername] = useState("");

    const navigate = useNavigate();
    return(

        <div className="loginPage">
            <TextField className="loginField"
                       id="standard-basic"
                       label="Username"
                       variant="standard"
                       value={username}
                       onChange={(e)=>{
                           setUsername(e.target.value)
                       }}
            />

            <Button className="loginField"
                    variant="contained"
                    onClick={() =>{
                        console.log(username)
                        sessionStorage.setItem("username",username)
                        sessionStorage.setItem("isLoggedIn","true")
                        sessionStorage.setItem("isAdmin","false")
                        navigate("/home")
                    }}
            >
                Login</Button>

            <Button className="loginField"
                    onClick={() =>{
                        sessionStorage.setItem("isLoggedIn","true")
                        sessionStorage.setItem("isAdmin","true")
                        navigate("/home")
                    }}
            >
                Login as Admin
            </Button>

        </div>
    )
}
export default Login;

