import React, { useEffect, useState } from 'react';
import { fetchUserFriends, fetchUserReviews } from '../assets/services/friendService';
import { useParams } from 'react-router-dom';

interface Friend {
  userId: number;
  username: string;
}

interface Review {
  reviewId: number;
  songname: string;  
  contents: string;
  username: string;
}

const FriendsList: React.FC = () => {
  const { userId } = useParams();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendReviews, setFriendReviews] = useState<{ [key: string]: Review[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFriendsAndReviews = async () => {
      if (userId) {
        try {
          const friendsData = await fetchUserFriends(Number(userId));
          setFriends(friendsData);

          // Object to hold reviews mapped by each friend's username
          const reviewsMap: { [key: string]: Review[] } = {};

          for (const friend of friendsData) {
            const friendReviewsData = await fetchUserReviews(friend.userId);

            // Filter reviews for the current friend by matching username
            const matchingReviews = friendReviewsData.filter(
              (review: Review) => review.username === friend.username
            );

            reviewsMap[friend.username] = matchingReviews;
          }

          setFriendReviews(reviewsMap);

        } catch (err) {
          setError('Could not fetch friends or reviews.');
        } finally {
          setLoading(false);
        }
      }
    };

    getFriendsAndReviews();
  }, [userId]);

  if (loading) {
    return <div>Fetching your friends and reviews!</div>;
  }

  if (error) {
    return <div>Issue with fetching your friends or reviews. Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Friends</h2>
      {friends.length === 0 ? (
        <p>You have no friends yet.</p>
      ) : (
        
        <ul>
          {friends.map((friend) => (
            <li key={friend.userId}>
              {friend.username}
              <ul>
                {friendReviews[friend.username] && friendReviews[friend.username].length > 0 ? (
                  friendReviews[friend.username].map((review: Review) => {
                    console.log("Review data in map:", review); 
                    return (
                      <li key={review.reviewId}>
                        <strong>Song:</strong> {review.songname || "No song name available"} - {review.contents}
                      </li>
                    );
                  })
                ) : (
                  <p>No reviews available for this friend.</p>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
