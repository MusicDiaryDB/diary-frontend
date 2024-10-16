import { Song } from "../models/entry";

export function getEntrySongs(entryId:number): Song[]   {
    return [
        {songId:1, releaseDate: "some date", name: "A by B", artist: "Jake", album: "Album1"},
        {songId:1, releaseDate: "some date", name: "A by B", artist: "Jake", album: "Album1"},
        {songId:1, releaseDate: "some date", name: "A by B", artist: "Jake", album: "Album1"},
    ]
}