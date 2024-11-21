import {Link} from 'react-router-dom';
import {Button, Card, CardContent, Typography} from '@mui/material';
import "../assets/css/pages/DiaryEntries.css";
import {Album, Artist, Entry, Song} from '../assets/models/entry';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getUserDiaryEntries} from '../assets/services/diary/userDiaryEntries';
import {UserSessionKey} from '../assets/services/diary/user';
import {getAllSongsAlbumsArtists, getSongByName} from '../assets/services/diary/song';

function getSong(entrySongId: any, songs: Song[]) {
    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].songId === entrySongId)
                return songs[i]
        }
    }
    return {
        songId: "",
        albumId: "",
        name: ""
    }
}

function getArtistName(entrySongID: any, songs: Song[], artists: Artist[], albums: Album[]) {
    const song = getSong(entrySongID, songs)
    console.log(albums)
    if (albums) {
        console.log(1)
        for (let i = 0; i < albums.length; i++) {
            if (albums[i].albumId === song.albumId){
                console.log(2)
                if (artists) {
                    for (let j = 0; j < artists.length; j++) {
                        if (artists[j].artistId === albums[i].artistId)
                            return artists[j].name
                    }
                }
            }
        }
    }
    return "unknown"
}

function DiaryEntries() {

    const queryClient = useQueryClient()
    const userId = JSON.parse(sessionStorage.getItem(UserSessionKey) || "UserID : ''").UserID

    const {data: entries, isLoading: isLoadingEntries} = useQuery({
        queryKey: ["entries", userId],
        queryFn: () => getUserDiaryEntries(parseInt(userId), null, null)
    })

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


    // @ts-ignore
    return (
        <div className="viewEntries">

            <Link to="/home">
                <Button variant="outlined">Add Entry</Button>
            </Link>

            <h2>My Entries</h2>
            {
                // @ts-ignore
                !(isLoadingEntries && isLoadingSongs && isLoadingAlbums && isLoadingArtist) &&
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly"
                    }}
                >
                    {
                        // @ts-ignore
                        entries.map((entry, index) => (
                            <Card sx={{width: 345}} key={index}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {
                                            //@ts-ignore
                                            getSong(entry.SongID, songs).name
                                        }
                                    </Typography>

                                    <Typography variant="body2" sx={{color: "text.secondary"}}>
                                        {
                                            //@ts-ignore
                                            "by " + getArtistName(entry.SongID, artists, albums)
                                        }
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                </div>

            }


        </div>
    )
}

export default DiaryEntries;