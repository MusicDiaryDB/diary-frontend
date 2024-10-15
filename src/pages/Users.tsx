import {Link, useLocation} from 'react-router-dom';
import {Button, FormControlLabel, Switch, TextField} from '@mui/material';
import "../assets/css/pages/Users.css"
import {User} from "../assets/models/user"
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Users(){

    const testUsers: User[] = [
        {userId:1,username:"kwasi",visibility:true},
        {userId:1,username:"kwasi",visibility:true},
        {userId:1,username:"kwasi",visibility:true},
        {userId:1,username:"kwasi",visibility:true}
    ]
    return(
        <div className="manageUsersPage">
            <div className="addUser">

                <h2>Add New User</h2>
                <div className="addUserFields">
                    <TextField id="standard-basic" label="Username" variant="standard" />
                    <FormControlLabel required control={<Switch />} label="Public Account?" />
                    <Button variant="outlined">Add User</Button>
                </div>

                <h2>Manage Users</h2>

                {testUsers.map((user) => (
                    <div className="userListing">
                        <div className="username">
                            <p>{user.username}</p>
                            <FontAwesomeIcon icon={faPenToSquare}/>
                        </div>

                        <FormControlLabel required control={<Switch/>} label="Public Account?"/>
                        <FontAwesomeIcon icon={faTrash} /> 
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Users;

