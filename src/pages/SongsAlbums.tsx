import {Link} from 'react-router-dom';
import {Box, Button, TextField} from '@mui/material';
import "../assets/css/pages/Users.css"
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {createUser, getAllUsers} from '../assets/services/diary/user';
import {useState} from 'react';
import {findPossibleSongs} from '../assets/services/genius';
import {PossibleSong} from '../assets/models/entry';
import {addNewSongFromGeniusSearch, deleteSongAlbumArtist, getAllSongsAlbumsArtists} from '../assets/services/diary/song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SongsAlbums() {

    const [possibleSongs, setPossibleSongs] = useState<PossibleSong[]>([])
    const [newSongTitle, setNewSongTitle] = useState<string>("")
    const [newSongArtist, setNewSongArtist] = useState<string>("")

    const queryClient = useQueryClient()

    const {data: songs, isLoading: isLoadingSongs} = useQuery({
        queryKey: ["songs"],
        queryFn: () => getAllSongsAlbumsArtists("song")
    })

    const {data: albums, isLoading: isLoadingAlbums} = useQuery({
        queryKey: ["albums"],
        queryFn: () => getAllSongsAlbumsArtists("album")
    })

    const {data: artists, isLoading: isLoadingArtist} = useQuery({
        queryKey: ["artists"],
        queryFn: () => getAllSongsAlbumsArtists("artist")
    })

    //Used to delete either song album or artist
    const deleteSongAlbumArtistMutation = useMutation({
        mutationFn: (data : {tableName:string;id:number;}) =>
            deleteSongAlbumArtist(data.tableName,data.id),
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['songs']})
            queryClient.invalidateQueries({queryKey: ['albums']})
            queryClient.invalidateQueries({queryKey: ['artists']})
        }
    })

    const notify = () => toast("Wow so easy!");
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
                                findPossibleSongs(newSongTitle, newSongArtist)
                                    .then((possibleSongs) =>
                                        setPossibleSongs(possibleSongs || [])
                                    )
                            }
                            }
                    >Search Song</Button>

                </div>
                <div style={{alignItems: "center"}}>
                    {
                        possibleSongs.map((ps, index) => (
                                <div style={{display: "flex", flexDirection: "row"}} key={index}>

                                    <p>{ps.fullTitle}</p>
                                    <button
                                        onClick={() => {
                                            addNewSongFromGeniusSearch(possibleSongs[index].geniusSongId)
                                                .then((state) => {
                                                    setPossibleSongs([])

                                                    if (state?.isSongMutated){
                                                        queryClient.invalidateQueries({queryKey: ['songs']})
                                                    }else {
                                                    }
                                                    if (state?.isAlbumMutated){
                                                        queryClient.invalidateQueries({queryKey: ['albums']})
                                                    }
                                                    if (state?.isArtistMutated){
                                                        queryClient.invalidateQueries({queryKey: ['artists']})
                                                    }

                                                })
                                        }}
                                    >Confirm Entry
                                    </button>

                                </div>
                            )
                        )
                    }
                </div>



                <div style={{display: "flex",flexDirection:"column", justifyContent: "space-between"}}>
                    <p style={{color: "navy", cursor: "pointer"}}
                       onClick={() =>{
                           queryClient.invalidateQueries({queryKey: ['songs']})
                           queryClient.invalidateQueries({queryKey: ['albums']})
                           queryClient.invalidateQueries({queryKey: ['artists']})
                    }}>
                        Refresh
                    </p>

                    <div
                        style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}
                    >
                        <div className="mgt-lists">
                            <p>Songs</p>
                            { !isLoadingSongs &&
                                songs?.map((song,index)=>(
                                    <Box key={index}>
                                        <p>{song.name}</p>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => {

                                                // @ts-ignore
                                                console.log(song)
                                                // @ts-ignore
                                                deleteSongAlbumArtistMutation.mutate({tableName:"song",id:song.songId})
                                            }}
                                        />
                                    </Box>


                                ))}

                        </div>

                        <div className="mgt-lists">
                            <p>Albums</p>
                            { !isLoadingAlbums &&
                                albums?.map((album)=>(
                                    <p>{album.name}</p>
                                ))}

                        </div>

                        <div className="mgt-lists">
                            <p>Artists</p>
                            { !isLoadingArtist &&
                                artists?.map((artist)=>(
                                    <p>{artist.name}</p>
                                ))}

                        </div>

                    </div>


                </div>

            </div>
        </div>
    )
}

export default SongsAlbums;

