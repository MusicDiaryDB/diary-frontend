import { useCallback, useEffect, useState } from "react";
import {
  deleteReview,
  getAllReviews,
  Review,
} from "../assets/services/diary/adminReviews";
import "../assets/css/pages/UserReviews.css";

const AdminReviews: React.FC = function () {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingReviewId, setPendingReviewId] = useState<number | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await getAllReviews();
      setReviews(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteReviewHandler = (reviewId: number) => {
    setShowConfirm(true);
    if (!deleteReview(reviewId)) {
      console.log("Failed to delete review");
      return;
    }
    setPendingReviewId(reviewId);
  };

  const confirmDeleteReview = () => {
    if (pendingReviewId !== null) {
      setReviews(
        reviews.filter((review) => review.ReviewID !== pendingReviewId),
      );
    }
    closeConfirm();
  };

  const closeConfirm = () => {
    setShowConfirm(false);
    setPendingReviewId(null);
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="container">
      <h2>Reviews</h2>
      <button className="button-submit" onClick={fetchReviews}>
        Refresh Reviews
      </button>
      <div className="result-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.ReviewID} className="result-container">
              <h3>
                Review ID: <em>{review.ReviewID}</em>
              </h3>
              <strong>User ID:</strong> {review.UserID}
              <br />
              <strong>Song ID:</strong> {review.SongID}
              <br />
              <strong>Contents:</strong> {review.Contents}
              <br />
              <strong>Visibility:</strong> {review.Visibility}
              <br />
              <button
                className="delete-button"
                onClick={() => deleteReviewHandler(review.ReviewID)}
              >
                Delete Review
              </button>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>

      {showConfirm && (
        <div className="confirm">
          <div className="confirm-content">
            <p>Are you sure you want to delete this review?</p>
            <button className="confirm-button" onClick={confirmDeleteReview}>
              Yes
            </button>
            <button className="cancel-button" onClick={closeConfirm}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
