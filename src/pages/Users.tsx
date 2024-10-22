import {Link, useLocation} from 'react-router-dom';
import {Button, FormControlLabel, MenuItem, Switch, TextField} from '@mui/material';
import "../assets/css/pages/Users.css"
import {User} from "../assets/models/user"
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers, updateUser } from '../assets/services/diary/user';
import { useState } from 'react';
import { USER_VISIBILITY } from '../assets/constants';

function Users(){

    const [retry,updateRetry] = useState(0)

    const { data: users, isLoading: isLoadingUsers } = useQuery({
        queryKey: ["allUsers",retry],
        queryFn: () => getAllUsers()
    })

    // @ts-ignore
    return(
        <div className="manageUsersPage">
            <div className="addUser">

                <h2>Add New User</h2>
                <div className="addUserFields">
                    <TextField id="standard-basic" label="Username" variant="standard"/>
                    <TextField
                        required
                        id="outlined-select-currency"
                        select
                        label="Visibility"
                        defaultValue="EUR"
                        helperText="Please preferred visibility"
                    >
                        {USER_VISIBILITY.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="outlined">Add User</Button>

                    </div>

                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <h2>Manage Users</h2>
                        <p style={{color: "navy", cursor: "pointer"}} onClick={() => updateRetry(retry + 1)}>Refresh</p>
                    </div>

                    {
                        !isLoadingUsers &&
                        // @ts-ignore
                        users.map((user) => (
                            <div className="userListing">
                                <div className="username">
                                    <TextField
                                    defaultValue={user.Username}
                                    />
                                    {/*todo show tick when name changes*/}
                                    <FontAwesomeIcon icon={faCheck}
                                                     color={"green"}
                                                     onClick={()=>{
                                                         // todo update user here
                                                         updateUser({
                                                             UserID:user.UserID,
                                                             Username:user.Username,
                                                             Visibility:user.Visibility}
                                                         )
                                                     }}/>
                                    <FontAwesomeIcon icon={faX}
                                                     color={"red"}
                                                     onClick={() => {
                                                         // todo revert here
                                                     }}

                                    />
                                </div>

                                <div style={{display:"flex", flexDirection:"row", gap:"1rem"}} >
                                    <TextField
                                        required
                                        id="outlined-select-currency"
                                        select
                                        label="Visibility"
                                        defaultValue={user.Visibility.toUpperCase()}
                                    >
                                        {USER_VISIBILITY.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {/*todo show tick when name changes*/}
                                    <FontAwesomeIcon icon={faCheck}
                                                     color={"green"}
                                                     onClick={()=>{
                                                         // todo update user here
                                                         updateUser({
                                                             UserID:user.UserID,
                                                             Username:user.Username,
                                                             Visibility:user.Visibility}
                                                         )
                                                     }}/>
                                    <FontAwesomeIcon icon={faX}
                                                     color={"red"}
                                                     onClick={() => {
                                                         // todo revert here
                                                     }}

                                    />
                                </div>

                                <FontAwesomeIcon icon={faTrash}/>
                            </div>
                        ))}

                </div>
            </div>
            )
            }

            export default Users;

