import React, { useCallback, useEffect, useState } from "react";
import {
  FriendReview,
  getFriendsReviews,
} from "../assets/services/diary/userFriendReviews";
import { useParams } from "react-router-dom";

const FriendsList: React.FC = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState<FriendReview[]>([]);

  const fetchReviews = useCallback(async () => {
    if (!userId) return;
    try {
      const revs = await getFriendsReviews(Number(userId));
      setReviews(revs);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="container">
      <h2>Your Friends' Reviews</h2>

      <div className="button-container">
        <button className="button-common button-submit" onClick={fetchReviews}>
          Refresh Reviews
        </button>
      </div>
      <div className="result-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.reviewid} className="result-container">
              <h3>Friend: {review.friendusername}</h3>
              <strong>Song: </strong>
              <em>{review.songname}</em>
              <br />
              <strong>Review:</strong> {review.contents}
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
