import {Link, useLocation} from 'react-router-dom';
import { TextField } from '@mui/material';
import "../assets/css/pages/Home.css"

function Home(){

    return(

        <div className="homePage">
            <p>What are we jamming to this week?</p>
            <div className="diaryEntiresSection">
                <TextField className="diaryEntryField" id="standard-basic" label="Enter song" variant="standard" />
                <TextField className="diaryEntryField" id="standard-basic" label="Enter song" variant="standard" />
                <TextField className="diaryEntryField" id="standard-basic" label="Enter song" variant="standard" />
            </div>

        </div>
    )
}
export default Home;

