import {Link, useLocation} from 'react-router-dom';
import {Button, FormControlLabel, Switch, TextField} from '@mui/material';
import "../assets/css/pages/Users.css"

function Users(){

    return(
        <div className="manageUsersPage">
            <div className="addUser">
                <TextField id="standard-basic" label="Enter Username" variant="standard" />
                <FormControlLabel required control={<Switch />} label="Public Account?" />
                <Button variant="outlined">Outlined</Button>
            </div>
        </div>
    )
}
export default Users;

