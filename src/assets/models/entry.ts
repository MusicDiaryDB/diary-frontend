export interface Entry {
    entryId: number;
    date: string;
    description: string;
    visibility: string;
    userId: number;
}

export interface EntrySongs{
    entryId: number;
    songId: number;
}

export interface Song{
    songId: number;
    releaseDate: string;
    name: string;
    // artist:string;
    // album: string
}

export interface Album {
    name: string;
    artistId: string
}

export interface Artist {
    name: string;
}

export interface PossibleSong{
    geniusSongId: number;
    fullTitle: string;
}