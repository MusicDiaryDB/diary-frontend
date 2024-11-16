import { diaryClient } from "../axios";

export interface Review {
  Contents: string;
  ReviewID: number;
  SongID: number;
  UserID: number;
  Visibility: string;
}

export const getAllReviews = async function (): Promise<Review[]> {
  try {
    const resp = await diaryClient.get(`/reviews/all`);
    let res = resp.data.result;
    return res;
  } catch (error) {
    console.log("Error fetching all reviews:", error);
    throw error;
  }
};

export const deleteReview = async function (
  reviewId: number,
): Promise<boolean> {
  try {
    const resp = await diaryClient.delete(`/review/${reviewId}`);
    let res = resp.data.message;
    return res === "Review deleted";
  } catch (error) {
    console.log("Error deleting review with ID:", reviewId, error);
    throw error;
  }
};
