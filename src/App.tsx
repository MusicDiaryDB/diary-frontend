import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./pages/components/layout/AppHeader";
import { useParams, Outlet  } from 'react-router-dom';
import Home from "./pages/Home";
import Users from "./pages/Users";
import AppFooter from "./pages/components/layout/AppFooter";
import Login from "./pages/Login";
import DiaryEntries from "./pages/DiaryEntries";
import Management from "./pages/Management";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SongsAlbums from "./pages/SongsAlbums";
import FriendsList from "./pages/FriendsList";
import Reviews from "./pages/Reviews";
import UserNavBar from "./pages/components/layout/UserNavBar";

import Graph from "./pages/Graph";
import AdminBoard from "./pages/AdminBoard";
import AdminMetrics from "./pages/AdminMetrics";
import UserDiaryReportCreate from "./pages/UserDiaryReportCreate";
import UserReviewCreate from "./pages/UserReviewCreate";
import UserReviews from "./pages/UserReviews";
import LandingPage from "./pages/Landing";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppHeader />
        
        <Routes>
          {/* User-specific routes */}
          <Route path="/:userId/*" element={<NavbarWrapper />}>
            <Route path="home" element={<Home />} />
            <Route path="friends" element={<FriendsList />} />
            <Route path="reviews" element={<UserReviews />} />
            <Route path="reports/new" element={<UserDiaryReportCreate />} />
            <Route path="review/new" element={<UserReviewCreate />} />
            {/* Add any other user-specific pages */}
          </Route>

          {/* Routes for general pages */}
          <Route path="/entries" element={<DiaryEntries />} />
          <Route path="/users" element={<Users />} />
          <Route path="/songs_albums" element={<SongsAlbums />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/manage" element={<Management />} />
          <Route path="/login" element={<Login />}/>

          {/* admin specific endpoints */}
          <Route path="/admin/info-metrics" element={<AdminMetrics />} />
          <Route path="/admin/aggregate-metrics" element={<AdminBoard />} />
          <Route path="/admin/aggregate-graph" element={<Graph />} />

          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        <AppFooter />
      </Router>
    </QueryClientProvider>
  );
}

const NavbarWrapper = () => {
  const { userId } = useParams(); // gets user id
  return (
    <div>
      {userId && <UserNavBar userId={userId} />}
      <Outlet /> {/* This renders the child routes */}
    </div>
  );
};

export default App;
