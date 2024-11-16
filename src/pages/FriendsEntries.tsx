import React, { useEffect, useState } from 'react';
import { fetchFriendsDiaryEntries } from '../assets/services/friendsDiaryEntry';
import { useParams } from 'react-router-dom';

interface FriendDiaryEntry {
  EntryID: number;
  Description: string;
  Date: string;
}

const FriendsDiaryEntries: React.FC = () => {
  const { userId } = useParams();  // Get userId from the URL
  const [friendsEntries, setFriendsEntries] = useState<{ [key: string]: FriendDiaryEntry[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetFriendsDiaryEntries = async () => {
      if (userId) {
        try {
          // Fetch all friends' diary entries using the current userId
          const entries = await fetchFriendsDiaryEntries(Number(userId));
          console.log('Fetched all friends\' diary entries: ', entries);
          setFriendsEntries(entries);
        } catch (err) {
          setError('Could not fetch friends diary entries.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAndSetFriendsDiaryEntries();
  }, [userId]);  

  if (loading) {
    return <div>Loading friends' diary entries...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // I used chatgpt for this table generation. I got too tired.
  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Friends' Diary Entries</h2>
        {Object.keys(friendsEntries).length === 0 ? (
          <p>No diary entries found for your friends.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Username</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Entry Description</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Entry Date</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(friendsEntries).map((username) =>
                friendsEntries[username].map((entry, index) => (
                  <tr
                    key={`${username}-${entry.EntryID}`}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f1f1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fafafa' : '#ffffff';
                    }}
                  >
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{username}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{entry.Description}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                      <i>{entry.Date}</i>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FriendsDiaryEntries;
