import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getUserReviews,
  DisplayReview,
  getReviewInfo,
} from "../assets/services/diary/userReviews";
import "../assets/css/pages/UserReviews.css";

const UserReviews: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [reviews, setReviews] = useState<DisplayReview[]>([]);

  const fetchReviews = useCallback(async () => {
    if (!userId) return;
    try {
      const revs = await getUserReviews(Number(userId));
      const res = await Promise.all(
        revs.map(async (rev) => {
          const reviewInfo = await getReviewInfo(rev.ReviewID);
          return reviewInfo;
        }),
      );
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

      <div className="button-container">
        <button className="button-common button-submit" onClick={fetchReviews}>
          Refresh Reviews
        </button>
        <Link
          to={`/user/${userId}/review/new`}
          className="button-common button-generate"
        >
          Create Review
        </Link>
      </div>
      <div className="result-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.ReviewID} className="result-container">
              <h3>
                Song: <em>{review.SongName}</em>
              </h3>
              <h4>Artist: {review.ArtistName}</h4>
              <h4>Album: {review.AlbumName}</h4>
              <strong>Review:</strong> {review.Contents}
              <br />
              <strong>Visibility:</strong> {review.Visibility}
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
