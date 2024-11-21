import axios from "axios";

const API_URL = "http://localhost:5400";

export const fetchUserFriends = async (userId: number) => {
  try {
    // Get the user's friends for the given userId
    console.log("UserID:", userId);
    const response = await axios.get(`${API_URL}/user_friends/${userId}`);
    let friendsData = response.data;

    return friendsData.map((friend: any) => ({
      userId: friend.UserID,
      username: friend.Username,
    }));
  } catch (error) {
    console.error("Error fetching friends", error);
    throw new Error("Failed to fetch friends");
  }
};

export const fetchUserReviews = async (userId: number) => {
  console.log("HERE:", userId);
  try {
    const response = await axios.get(`${API_URL}/user_reviews/${userId}`);
    const reviews = response.data;

    console.log("Fetched reviews:", reviews);
    return reviews.map((review: any) => ({
      reviewId: review.ReviewID,
      songname: review.songname,
      contents: review.Contents,
      username: review.Username,
    }));
  } catch (error) {
    console.error("Error fetching reviews", error);
    throw new Error("Failed to fetch reviews");
  }
};
