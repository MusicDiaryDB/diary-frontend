import {useNavigate} from 'react-router-dom';
import {Button, MenuItem, TextField, TextareaAutosize} from '@mui/material';
import "../assets/css/pages/Home.css"
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {USER_VISIBILITY} from '../assets/constants';
import {findPossibleSongs} from '../assets/services/genius';
import {PossibleSong} from '../assets/models/entry';
import {makeEntries} from '../assets/services/diary/userDiaryEntries';

function Home() {

    const navigate = useNavigate()
    // @ts-ignore
    const [song, setSong] = useState<string>("")
    const [possibleEntries, setPossibleEntries] = useState<PossibleSong[]>([])

    const [message, setMessage] = useState<string>("")
    const [showMessage, setShowMessage] = useState<boolean>(false)

    const [entryDescription, setEntryDescription] = useState<string>("")
    const [entryVisibility, setEntryVisibility] = useState<string>("PUBLIC")

    return (
        <div className="homePage">

            <h1>What are we jamming to this week?</h1>
            <div>
                <div>
                    {possibleEntries.map((entry, index) => (
                        <div className="entryDetails" key={index}>
                            <p style={{padding: "0 0 1rem 0"}}>{entry.fullTitle}</p>
                            <div className="entryOptions">
                                <TextareaAutosize
                                    minRows={2}
                                    value={entryDescription}
                                    onChange={(e) => {
                                        setEntryDescription(e.target.value)
                                    }}
                                />

                                <TextField
                                    required
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    defaultValue="PUBLIC"
                                    helperText="Please select your currency"
                                >
                                    {USER_VISIBILITY.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                            onClick={() => setEntryVisibility(option.value)}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <FontAwesomeIcon icon={faTrash}
                                             style={{
                                                 color: "red",
                                                 padding: 0
                                             }}
                                             onClick={() => {
                                                 const newPossibleEntries = possibleEntries.
                                                 filter((ps) =>
                                                     entry.geniusSongId != ps.geniusSongId)
                                                 setPossibleEntries(newPossibleEntries)
                                             }}
                            />
                        </div>
                    ))}
                </div>

            </div>


            <div className="diaryEntriesSection">
                {possibleEntries.length < 3 &&
                    <div className="addSong">
                        <TextField id="standard-basic"
                                   label="Find Song"
                                   variant="standard"
                                   value={song}
                                   onChange={(e) => {
                                       // @ts-ignore
                                       setSong(e.target.value)
                                   }}
                        />
                        <Button onClick={() => {
                            if (song !== "") {
                                if (possibleEntries.length < 3) {
                                    findPossibleSongs(song).then(async (possibleSongs) => {
                                        if (possibleSongs != undefined) {
                                            if (possibleSongs.length != 0) {
                                                let inPossibleEntries = false
                                                possibleEntries.map((possibleEntry) => {
                                                    if (possibleEntry.geniusSongId === possibleSongs[0].geniusSongId) {
                                                        inPossibleEntries = true
                                                        return
                                                    }
                                                })
                                                if (!inPossibleEntries) {
                                                    setPossibleEntries([...possibleEntries, possibleSongs[0]])
                                                    setSong("")
                                                } else {
                                                    setMessage("Song already selected")
                                                    setShowMessage(true)
                                                    await new Promise(r => setTimeout(r, 1000));
                                                    setShowMessage(false)
                                                    setMessage("")
                                                }
                                            } else {
                                                setMessage("No song found")
                                                setShowMessage(true)
                                                await new Promise(r => setTimeout(r, 1000));
                                                setShowMessage(false)
                                                setMessage("")
                                            }

                                        }
                                    })
                                }

                            }
                        }}>
                            Search Song</Button>
                    </div>
                }
                {showMessage && <p style={{color: "red"}}>{message}</p>}
                {possibleEntries.length > 0 &&
                    <div>
                        <Button color="success"
                                variant="contained"
                                onClick={() => {
                                    // console.log(possibleEntries)
                                    makeEntries(possibleEntries, entryDescription, entryVisibility)
                                }}
                        >Confirm Diary Entry</Button>
                    </div>
                }
            </div>


        </div>
    )
}

export default Home;

