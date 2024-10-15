import {Link, useLocation} from 'react-router-dom';
import { TextField } from '@mui/material';
import "../assets/css/pages/Home.css"

function Home(){

    const isAdmin = sessionStorage.getItem("isAdmin") === "true"

    return(
        <div className="homePage">

            {isAdmin && <p>isAdmin</p>}
            <p>What are we jamming to this week?</p>
            <div className="diaryEntiresSection">
                <TextField id="standard-basic" label="Enter song" variant="standard" />
                <TextField id="standard-basic" label="Enter song" variant="standard" />
                <TextField id="standard-basic" label="Enter song" variant="standard" />
            </div>

        </div>
    )
}
export default Home;

