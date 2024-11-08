import {Link} from 'react-router-dom';
import { Button, TextField} from '@mui/material';
import "../assets/css/pages/SongAlbums.css"
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {createUser, getAllUsers} from '../assets/services/diary/user';
import {useState} from 'react';
import {findPossibleSongs} from '../assets/services/genius';
import {PossibleSong} from '../assets/models/entry';
import {addNewSongFromGeniusSearch, deleteSongAlbumArtist, getAllSongsAlbumsArtists} from '../assets/services/diary/song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SongsAlbums() {

    const [possibleSongs, setPossibleSongs] = useState<PossibleSong[]>([])
    const [newSongTitle, setNewSongTitle] = useState<string>("")
    const [newSongArtist, setNewSongArtist] = useState<string>("")
    const [showMessage, setShowMessage] = useState<boolean>(false)

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
                                                .then(async (state) => {
                                                    setPossibleSongs([])

                                                    if (state?.isSongMutated){
                                                        queryClient.invalidateQueries({queryKey: ['songs']})
                                                    }else {
                                                        setShowMessage(true)
                                                        await new Promise(r => setTimeout(r, 1000));
                                                        setShowMessage(false)
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
                {showMessage && <p>Song Already Added</p> }



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
                        style={{gap:"0.5rem",display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}
                    >
                        <div className="mgt-lists">
                            <p>Songs</p>
                            { !isLoadingSongs &&
                                songs?.map((song,index)=>(
                                    <div key={index} style={{display:"flex",flexDirection:"row"}} >
                                        <p>{song.name}</p>
                                        <FontAwesomeIcon
                                            color={"red"}
                                            icon={faTrash}
                                            onClick={() => {
                                                // @ts-ignore
                                                deleteSongAlbumArtistMutation.mutate({tableName:"song",id:song.songId})
                                            }}
                                        />
                                    </div>
                                ))}

                        </div>

                        <div className="mgt-lists">
                            <p>Albums</p>
                            { !isLoadingAlbums &&
                                albums?.map((album)=> (
                                    <div style={{display:"flex",flexDirection:"row"}}
                                    >
                                        <p>{album.name}</p>
                                        <FontAwesomeIcon
                                            color={"red"}
                                            icon={faTrash}
                                            onClick={() => {
                                                // @ts-ignore
                                                deleteSongAlbumArtistMutation.mutate({
                                                    tableName: "album",
                                                    // @ts-ignore
                                                    id: album.albumId
                                                })
                                            }}
                                        />
                                    </div>
                                ))}

                        </div>

                        <div className="mgt-lists">
                            <p>Artists</p>
                            { !isLoadingArtist &&
                                artists?.map((artist)=>(
                                    <div
                                        style={{display:"flex",flexDirection:"row"}}
                                    >
                                        <p>{artist.name}</p>
                                        <FontAwesomeIcon
                                            color={"red"}
                                            icon={faTrash}
                                            onClick={() => {
                                                // @ts-ignore
                                                deleteSongAlbumArtistMutation.mutate({
                                                    tableName: "artist",
                                                    // @ts-ignore
                                                    id: artist.artistId
                                                })
                                            }}
                                        />
                                    </div>

                                ))}

                        </div>

                    </div>


                </div>

            </div>
        </div>
    )
}

export default SongsAlbums;

