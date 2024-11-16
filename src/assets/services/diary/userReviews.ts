import { diaryClient } from "../axios";
import { getSongByName, getSongByID } from "./song";

interface Review {
  ReviewID: number;
  Contents: string;
  Visibility: string;
  SongID: number;
  UserID: number;
}

export interface DisplayReview {
  SongName: string;
  AlbumName: string;
  ArtistName: string;
  Contents: string;
  Visibility: string;
  ReviewID: number;
}

export const createUserReview = async function (
  contents: string,
  songName: string,
  userId: number,
  visibility: string,
): Promise<{ reviewId: number; review: DisplayReview }> {
  const song = await getSongByName(songName);
  // TODO: add song to database if it doesn't exist already
  const songId = song?.songId;

  let res;
  try {
    const form = new FormData();
    form.append("contents", contents);
    form.append("songId", songId.toString());
    form.append("userId", userId.toString());
    form.append("visibility", visibility);

    const resp = await diaryClient.post("/review/", form);
    console.log(resp);
    res = resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
  return {
    reviewId: res.ReviewID,
    review: {
      Contents: contents,
      SongName: songName,
      Visibility: visibility,
      ReviewID: res.ReviewID,
      AlbumName: "",
      ArtistName: "",
    },
  };
};

export const getUserReviews = async function (
  userId: number,
): Promise<Review[]> {
  try {
    // Fetch user entries
    const resp = await diaryClient.get(`/review/user/${userId}`);
    const res = resp.data.result;
    return res;
  } catch (error) {
    console.log("Error fetching user reviews:", error);
    throw error;
  }
};

export const getReviewInfo = async function (
  review_id: number,
): Promise<DisplayReview> {
  try {
    const resp = await diaryClient.get(`/review/song/${review_id}`);
    let res = resp.data.result;
    if (res.length > 0) {
      res = res[0];
      res.ReviewID = review_id;
    }
    return res;
  } catch (error) {
    console.log("Error fetching review with ID:", review_id, error);
    throw error;
  }
};

export const fetchReviewSongNames = async function (
  reviews: Review[],
): Promise<DisplayReview[]> {
  const out = await Promise.all(
    reviews.map(async (review) => {
      const song = await getSongByID(review.SongID);
      return {
        SongName: song.Name,
        Contents: review.Contents,
        Visibility: review.Visibility,
        ReviewID: review.ReviewID,
        ArtistName: "",
        AlbumName: "",
      };
    }),
  );
  return out;
};
