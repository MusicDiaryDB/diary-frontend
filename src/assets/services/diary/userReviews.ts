import { diaryClient } from "../axios";
import { getSongByName } from "./song";

interface DisplayReview {
  SongName: string;
  Contents: string;
  Visibility: string;
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
    },
  };
};
