import {Link, useLocation} from 'react-router-dom';
import {Button, TextField } from '@mui/material';
import "../assets/css/pages/Home.css"
import { useState } from 'react';

function Home(){

    const isAdmin = sessionStorage.getItem("isAdmin") === "true"

    const [song, setSong] = useState("")
    const [entries, setEntries] = useState([])

    return(
        <div className="homePage">

            {isAdmin && <p>isAdmin</p>}
            <p>What are we jamming to this week?</p>
            {entries.map((entry) => (<div>
                <p>{entry}</p>
            </div>))}
            {entries.length<3 &&
            <div className="diaryEntriesSection">
                <TextField id="standard-basic"
                           label="Find Song"
                           variant="standard"
                           value={song}
                           onChange={(e)=>{
                               setSong(e.target.value)
                           }}
                />
                <Button onClick={()=>{
                    console.log(song)
                    setEntries([...entries,song])
                }}
                >+ Add Song</Button>
            </div>
            }

        </div>
    )
}
export default Home;

