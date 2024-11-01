import {Link} from 'react-router-dom';
import {Button, MenuItem, TextField} from '@mui/material';
import "../assets/css/pages/Users.css"
import {faCheck, faPen, faTrash, faX} from '@fortawesome/free-solid-svg-icons';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {createUser, getAllUsers} from '../assets/services/diary/user';
import {useState} from 'react';
import {USER_VISIBILITY} from '../assets/constants';
import UserListing from './components/users/UserListing';

function Users() {

    const [newUserName, setNewUserName] = useState<string>("")
    const [newUserVisbility, setNewUserVisibility] = useState<string>("PUBLIC")

    const {data: users, isLoading: isLoadingUsers} = useQuery({
        queryKey: ["allUsers"],
        queryFn: () => getAllUsers()
    })

    const addUserMutation = useMutation({
        mutationFn: ({username, visibility}: {
            username: string;
            visibility: string
        }) => createUser(username, visibility),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['allUsers']})
    })


    const queryClient = useQueryClient()

    // @ts-ignore
    return (
        <div className="manageUsersPage">
            <Link to="/manage">
                <button>
                    {"<-Back"}
                </button>
            </Link>


            <div className="addUser">

                <h2>Add New User</h2>
                <div className="addUserFields">

                    <TextField id="standard-basic"
                               label="Username"
                               variant="standard"
                               value={newUserName}
                               onChange={(e) => {
                                   setNewUserName(e.target.value)
                               }}
                    />
                    <TextField
                        required
                        id="outlined-select-currency"
                        select
                        label="Visibility"
                        defaultValue={newUserVisbility}
                        helperText="Please preferred visibility"
                    >
                        {USER_VISIBILITY.map((option) => (
                            <MenuItem key={option.value}
                                      value={option.value}
                                      onClick={() => setNewUserVisibility(option.value)}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="outlined"
                            onClick={() =>
                                addUserMutation.mutate(
                                    {
                                        username: newUserName,
                                        visibility: newUserVisbility
                                    })}
                    >Add User</Button>

                </div>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <h2>Manage Users</h2>
                    <p style={{color: "navy", cursor: "pointer"}}
                       onClick={() =>
                           queryClient.invalidateQueries({queryKey: ['allUsers']})}>
                        Refresh
                    </p>


                </div>

                {
                    !isLoadingUsers &&
                    // @ts-ignore
                    users.map((user, index) => (
                        <UserListing user={user} key={index}/>
                    ))}

            </div>
        </div>
    )
}

export default Users;

