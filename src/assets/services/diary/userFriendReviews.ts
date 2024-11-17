import { diaryClient } from "../axios";

export interface FriendReview {
  contents: string;
  friendusername: string;
  reviewid: number;
  songname: string;
}

export const getFriendsReviews = async function (
  userId: number,
): Promise<FriendReview[]> {
  try {
    const resp = await diaryClient.get(`/review/friends/${userId}`);
    let res = resp.data.result;
    return res;
  } catch (error) {
    console.log("Error fetching friends reviews:", error);
    throw error;
  }
};
