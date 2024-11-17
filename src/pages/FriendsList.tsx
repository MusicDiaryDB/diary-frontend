import React, { useEffect, useState } from "react";
import { fetchUserFriends } from "../assets/services/friendService";
import { useParams } from "react-router-dom";
import "../assets/css/pages/FriendsTable.css";
import AddFriendUser from "./components/layout/AddFriendUser";

interface Friend {
  userId: number;
  username: string;
}

const FriendsList: React.FC = () => {
  const { userId } = useParams();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFriends = async () => {
      if (userId) {
        try {
          const friendsData = await fetchUserFriends(Number(userId));
          setFriends(friendsData);
        } catch (err) {
          setError("Could not fetch friends.");
        } finally {
          setLoading(false);
        }
      }
    };

    getFriends();
  }, [userId]);

  if (loading) {
    return <div>Fetching your friends...</div>;
  }

  if (error) {
    return <div>Issue with fetching your friends. Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Your Friends</h2>
      <AddFriendUser />
      <br />

      {friends.length === 0 ? (
        <p>You have no friends yet.</p>
      ) : (
        <table className="friends-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend) => (
              <tr key={friend.userId}>
                <td>{friend.userId}</td>
                <td>{friend.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FriendsList;
