import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button} from '@mui/material';
import "../assests/css/pages/SongReviews.css";

function SongReviews() {
    const { songId } = useParams<{ songId: string }>(); // Get the song ID from the URL
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/songs/${songId}/reviews`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An Unknown error occurred.")
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [songId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="songReviews">
            <h2>Reviews for Song ID: {songId}</h2>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.ReviewID}>
                            <strong>{review.Username}:</strong> {review.Contents}
                            <p>Visibility: {review.Visibility}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews found for this song.</p>
            )}
            <Button variant="contained" onClick={() => window.history.back()}>
                Go Back
            </Button>
        </div>
    );
}

export default SongReviews;