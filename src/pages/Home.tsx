import {Link, useLocation} from 'react-router-dom';
import "../assets/css/components/layout/AppHeader.css"
import { TextField } from '@mui/material';

function AppHeader(){

    return(

        <div className="homePage">
            <TextField id="standard-basic" label="Attention by Charlie Puth" variant="standard" />
        </div>
    )
}
export default AppHeader;

