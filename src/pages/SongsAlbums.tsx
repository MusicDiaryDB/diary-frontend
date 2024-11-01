import {Link} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import "../assets/css/pages/Users.css"
import {faCheck, faPen, faTrash, faX} from '@fortawesome/free-solid-svg-icons';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {createUser, getAllUsers} from '../assets/services/diary/user';
import {useState} from 'react';
import {findPossibleSongs, getSongDetials} from '../assets/services/genius';
import {PossibleSong} from '../assets/models/entry';
import {addAlbum, addArtist, addNewSongFromGeniusSearch, addSong } from '../assets/services/diary/song';

function SongsAlbums() {

    const [possibleSongs, setPossibleSongs] = useState<PossibleSong[]>([])
    const [newSongTitle, setNewSongTitle] = useState<string>("")
    const [newSongArtist, setNewSongArtist] = useState<string>("")

    const {data: songs, isLoading: isLoadingSongs} = useQuery({
        queryKey: ["allSongs"],
        queryFn: () => getAllUsers()
    })

    const addSongMutation = useMutation({
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

                <h2>Find Song</h2>
                <div className="addUserFields">

                    <TextField id="standard-basic"
                               label="Enter Title"
                               variant="standard"
                               value={newSongTitle}
                               onChange={(e) => {
                                   setNewSongTitle(e.target.value)
                               }}
                    />

                    <TextField id="standard-basic"
                               label="Enter Artist"
                               variant="standard"
                               value={newSongArtist}
                               onChange={(e) => {
                                   setNewSongArtist(e.target.value)
                               }}
                    />

                    <Button variant="outlined"
                            onClick={() => {
                                findPossibleSongs("humle", "kendrick")
                                    .then((possibleSongs)=>
                                        setPossibleSongs(possibleSongs || [])
                                    )
                            }
                            }
                    >Search Song</Button>

                </div>
                <div style={{alignItems:"center"}}>
                    {
                        possibleSongs.map((ps, index) => (
                                <div style={{display:"flex",flexDirection:"row"}} key={index}>

                                    <p>{ps.fullTitle}</p>
                                    <button
                                        onClick={()=>{
                                            addNewSongFromGeniusSearch(possibleSongs[index].geniusSongId)
                                                .then((isAdded) =>{
                                                    isAdded && setPossibleSongs([])
                                                })
                                        }}
                                    >Confirm Entry</button>

                                </div>
                            )
                        )
                    }
                </div>


                {/*<h2>Find Album</h2>*/}
                {/*<div className="addUserFields">*/}

                {/*    <TextField id="standard-basic"*/}
                {/*               label="Username"*/}
                {/*               variant="standard"*/}
                {/*               value={newUserName}*/}
                {/*               onChange={(e) => {*/}
                {/*                   setNewUserName(e.target.value)*/}
                {/*               }}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        required*/}
                {/*        id="outlined-select-currency"*/}
                {/*        select*/}
                {/*        label="Visibility"*/}
                {/*        defaultValue={newUserVisbility}*/}
                {/*        helperText="Please preferred visibility"*/}
                {/*    >*/}
                {/*        {USER_VISIBILITY.map((option) => (*/}
                {/*            <MenuItem key={option.value}*/}
                {/*                      value={option.value}*/}
                {/*                      onClick={() => setNewUserVisibility(option.value)}*/}
                {/*            >*/}
                {/*                {option.label}*/}
                {/*            </MenuItem>*/}
                {/*        ))}*/}
                {/*    </TextField>*/}
                {/*    <Button variant="outlined"*/}
                {/*            onClick={() =>*/}
                {/*                addUserMutation.mutate(*/}
                {/*                    {*/}
                {/*                        username: newUserName,*/}
                {/*                        visibility: newUserVisbility*/}
                {/*                    })}*/}
                {/*    >Add User</Button>*/}

                {/*</div>*/}

                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <h2>Manage Users</h2>
                    <p style={{color: "navy", cursor: "pointer"}}
                       onClick={() =>
                           queryClient.invalidateQueries({queryKey: ['allUsers']})}>
                        Refresh
                    </p>


                </div>

            </div>
        </div>
    )
}

export default SongsAlbums;

