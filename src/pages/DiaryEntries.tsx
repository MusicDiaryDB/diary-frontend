import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import "../assets/css/pages/DiaryEntries.css";
import { Entry } from '../assets/models/entry';
import { useState } from 'react';

function DiaryEntries(){

    const testEntries: Entry[] = [
        {entryId: 1, date: "2022-11-12", description: "desc", visibility: "PRIVATE", userId: 1},
        {entryId: 1, date: "2022-11-12", description: "desc", visibility: "PRIVATE", userId: 1},
        {entryId: 1, date: "2022-11-12", description: "desc", visibility: "PRIVATE", userId: 1}
    ];

    const [hideSongDetailsDisplay,setHideSongDetailsDisplay] = useState("none")
    const [songDetailsDisplayText,setSongDetailsDisplayText] = useState("More Text")


    return(
        <div className="viewEntries">

            <Link to="/home">
                <Button variant="outlined">Add Entry</Button>
            </Link>

            <h2>My Entries</h2>

            {testEntries.map((entry,index) => (
                <div className="entryListing" key={index}>
                    <div className="entryTop">
                        <p>{entry.date}</p>
                        <p>{entry.visibility}</p>
                    </div>

                    <div className="entryBottom">
                        {/*{getEntrySongs(entry.entryId).map(*/}
                        {/*    (song: Song, index: number) => (*/}
                        {/*        <div key={index}>*/}
                        {/*            <p>{song.name}</p>*/}
                        {/*            <div className="songDetails" style={{display:hideSongDetailsDisplay}}>*/}
                        {/*                <p>Author: {song.artist}</p>*/}
                        {/*                <p>Album: {song.album}</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    ))}*/}
                        <p style={{
                            fontWeight: "bold",
                            textDecoration:"underline",
                            cursor:"pointer"
                        }}
                           onClick={() => {
                               if (hideSongDetailsDisplay === "none"){
                                   setHideSongDetailsDisplay("")
                                   setSongDetailsDisplayText("Less details")
                               } else {
                                   setHideSongDetailsDisplay("none")
                                   setSongDetailsDisplayText("More details")
                               }
                           }}
                        >
                            {songDetailsDisplayText}
                        </p>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default DiaryEntries;