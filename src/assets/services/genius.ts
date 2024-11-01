import {PossibleSong, Song} from '../models/entry';
import {geniusClient} from './axios';

export const findPossibleSongs = async (title?: string, artist?: string) => {
    try {
        let possibleSongs: PossibleSong[] = []
        const response = await geniusClient.get("/search", {
            params: {
                q: `${title} ${artist}`,
                per_page: '1',
                page: '1'
            }
        });
        response.data.hits.map((hit: any) => {
            if (hit.type === "song") {
                possibleSongs = [...possibleSongs, {geniusSongId: hit.result.id, fullTitle: hit.result.full_title}]
            }
        })

        console.log(response.data);
        return possibleSongs
    } catch (error) {
        console.error(error);
    }
}

export const getSongDetials = async (songId?: number) => {
    try {
        const songResponse = await geniusClient.get("/song/details", {
            params: {
                id: songId
            }
        });

        return {
            title: songResponse.data.song.title,
            artist: songResponse.data.song.primary_artist.name,
            albumName: songResponse.data.song.album?.name != null ? songResponse.data.song.album.name : `${songResponse.data.song.title}-Single`,
            releaseDate: songResponse.data.song.release_date
        }

    } catch (err) {
        console.error("Error getting song detials",err);
        throw err
    }
}

