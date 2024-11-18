import { useState, useEffect } from 'react';
import { fetchTotalUsers, fetchAvgNumEntries, fetchReviewsPerSong, fetchEntriesByDate, fetchFriendCounts, fetchVisibilityCountEntries, fetchMostReviewedSongs } from '../assets/services/adminMetricService';
import { CircularProgress, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminMetric = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [avgNumEntries, setAvgNumEntries] = useState<number | null>(null);
  const [reviewsPerSong, setReviewsPerSong] = useState<any[]>([]);
  const [entriesByDate, setEntriesByDate] = useState<any[]>([]);
  const [friendCounts, setFriendCounts] = useState<any[]>([]);
  const [visibilityCountEntries, setVisibilityCountEntries] = useState<any[]>([]);
  const [mostReviewedSongs, setMostReviewedSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalUsersData = await fetchTotalUsers();
        setTotalUsers(totalUsersData.total_users);

        const avgNumEntriesData = await fetchAvgNumEntries();
        setAvgNumEntries(Math.round(avgNumEntriesData.avg_entries_per_user * 100) / 100);

        const reviewsPerSongData = await fetchReviewsPerSong();
        setReviewsPerSong(reviewsPerSongData);

        const entriesByDateData = await fetchEntriesByDate();
        setEntriesByDate(entriesByDateData);

        const friendCountsData = await fetchFriendCounts();
        setFriendCounts(friendCountsData);

        const visibilityCountEntriesData = await fetchVisibilityCountEntries();
        setVisibilityCountEntries(visibilityCountEntriesData);

        const mostReviewedSongsData = await fetchMostReviewedSongs();
        setMostReviewedSongs(mostReviewedSongsData);
        
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching admin metrics data:', error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />; // Show loading spinner while fetching data
  }

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Metrics Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Total Users */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </Box>
        </Grid>

        {/* Average Visibility */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Average Number of Entries Per User</Typography>
            <Typography variant="h4">{avgNumEntries}</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Reviews Per Song Table */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" align="center" gutterBottom>Reviews Per Song</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Song ID</TableCell>
                <TableCell>Total Reviews</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviewsPerSong.map((song) => (
                <TableRow key={song.SongID}>
                  <TableCell>{song.SongID}</TableCell>
                  <TableCell>{song.total_reviews}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Entries by Date Table */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" align="center" gutterBottom>Entries by Date</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Entries Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entriesByDate.map((entry) => (
                <TableRow key={entry.Date}>
                  <TableCell>{entry.Date}</TableCell>
                  <TableCell>{entry.entry_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Friend Counts Table */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" align="center" gutterBottom>Friend Counts</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Friend Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {friendCounts.map((friendCount) => (
                <TableRow key={friendCount.UserID}>
                  <TableCell>{friendCount.UserID}</TableCell>
                  <TableCell>{friendCount.friend_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Visibility Count of Entries Table */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" align="center" gutterBottom>Visibility Count of Entries</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Visibility</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibilityCountEntries.map((visibility) => (
                <TableRow key={visibility.Visibility}>
                  <TableCell>{visibility.Visibility}</TableCell>
                  <TableCell>{visibility.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Most Reviewed Songs Table */}
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" align="center" gutterBottom>Most Reviewed Songs</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Song ID</TableCell>
                <TableCell>Review Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mostReviewedSongs.map((song) => (
                <TableRow key={song.SongID}>
                  <TableCell>{song.SongID}</TableCell>
                  <TableCell>{song.review_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminMetric;
