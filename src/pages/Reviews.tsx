import {Link} from 'react-router-dom';
import {Box, Button, TextField} from '@mui/material';
import "../assets/css/pages/SongAlbums.css"
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

function Reviews() {

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
        <div className="manageReviesPage">
            Reviews Page
        </div>
    )
}

export default Reviews;

