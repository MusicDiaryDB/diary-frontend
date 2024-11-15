import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  getUserReviews,
  DisplayReview,
  fetchReviewSongNames,
} from "../assets/services/diary/userReviews";
import "../assets/css/pages/UserReviews.css";

const UserReviews: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [reviews, setReviews] = useState<DisplayReview[]>([]);

  const fetchReviews = useCallback(async () => {
    if (!userId) return;
    try {
      const reviews = await getUserReviews(Number(userId));
      const res = await fetchReviewSongNames(reviews);
      setReviews(res);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="container">
      <h2>Your Reviews</h2>
      <button className="button-submit" onClick={fetchReviews}>
        Refresh Reviews
      </button>
      <div className="result-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.ReviewID} className="result-container">
              <h3>Song: {review.SongName}</h3>
              <p>
                <strong>{review.Contents}</strong>
              </p>
              <p>
                <strong>Visibility:</strong> {review.Visibility}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default UserReviews;
