import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "../assets/css/pages/Login.css";
import { useState } from "react";
import { createUser, getUserByUsername } from "../assets/services/diary/user";

function Login() {
  const [username, setUsername] = useState("");
  const [loginButtonText, setLoginButtonText] = useState("Login");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  return (
    <div className="loginPage">
      <TextField
        className="loginField"
        id="standard-basic"
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        id="user-password"
        variant="standard"
        label="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button
        className="loginField"
        variant="contained"
        disabled={loginButtonText !== "Login"}
        onClick={() => {
          console.log(username);

          // TODO: login validation
          getUserByUsername(username)
            .then((res) => {
              console.log("already exists");
              sessionStorage.setItem("username", res.Username);
              sessionStorage.setItem("user_id", res.UserId);
              // @ts-ignore
              sessionStorage.setItem("isLoggedIn", true);
              // @ts-ignore
              sessionStorage.setItem("isAdmin", false);
              navigate("/home");
            })
            .catch(async (error) => {
              setLoginButtonText("Creating User...");
              console.log("creating user");

              //Wait to see User being created
              await new Promise((r) => setTimeout(r, 1000));
              createUser(username, "public", password, false).then((res) => {
                if (res.status === 201) {
                  sessionStorage.setItem("username", username);
                  // @ts-ignore
                  sessionStorage.setItem("isLoggedIn", true);
                  // @ts-ignore
                  sessionStorage.setItem("isAdmin", false);
                  navigate("/home");
                }
              });
              setLoginButtonText("Login");
            });
        }}
      >
        {loginButtonText}
      </Button>

      <Button
        className="loginField"
        onClick={() => {
          // @ts-ignore
          sessionStorage.setItem("isLoggedIn", true);
          // @ts-ignore
          sessionStorage.setItem("isAdmin", true);
          navigate("/manage");
        }}
      >
        Login as Admin
      </Button>
    </div>
  );
}
export default Login;
