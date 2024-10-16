import {useNavigate} from 'react-router-dom';
import {Button, MenuItem, TextField, TextareaAutosize } from '@mui/material';
import "../assets/css/pages/Home.css"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Home(){

const navigate = useNavigate()
    // @ts-ignore
    const [song, setSong] = useState("")
    const [entries, setEntries] = useState([])

    const visibility = [
        {
            value: 'PUBLIC',
            label: 'PUBLIC',
        },
        {
            value: 'PRIVATE',
            label: 'PRIVATE',
        },
        {
            value: 'FRIENDS',
            label: 'FRIENDS',
        },
    ];

    return(
        <div className="homePage">

            <p>What are we jamming to this week?</p>
            <div>
                <div>
                    {entries.map((entry) => (
                    <div className="entryDetails">
                            <p style={{padding: "0 0 1rem 0"}}>{entry}</p>
                        <div className="entryOptions">
                            <TextareaAutosize minRows={2} />

                            <TextField
                                required
                                id="outlined-select-currency"
                                select
                                label="Select"
                                defaultValue="EUR"
                                helperText="Please select your currency"
                            >
                                {visibility.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <FontAwesomeIcon icon={faTrash}
                                         style={{
                                             color: "red",
                                             padding: 0
                                         }}/>
                    </div>
            ))}
        </div>

            </div>


            <div className="diaryEntriesSection">
                {entries.length<3 &&
                    <div className="addSong">
                        <TextField id="standard-basic"
                                   label="Find Song"
                                   variant="standard"
                                   value={song}
                                   onChange={(e)=>{
                                       // @ts-ignore
                                       setSong(e.target.value)
                                   }}
                        />
                        <Button onClick={()=>{
                            if (song !== ""){
                            // @ts-ignore
                            setEntries([...entries,song])
                            setSong("")}

                        }}
                        >+ Add Song</Button>
                    </div>
                }
                {entries.length > 0 &&
                    <div>
                        <Button color="success"
                                variant="contained"
                            onClick={()=>{
                           //todo make diary entry
                                navigate("/entries")
                        }}
                        >Confirm Diary Entry</Button>
                    </div>
                }
            </div>


        </div>
    )
}
export default Home;

