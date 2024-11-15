import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./pages/components/layout/AppHeader";
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

import Graph from "./pages/Graph";
import AdminBoard from "./pages/AdminBoard";
import AdminMetrics from "./pages/AdminMetrics";
import UserDiaryReportCreate from "./pages/UserDiaryReportCreate";
import UserReviewCreate from "./pages/UserReviewCreate";

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
          <Route path="/entries" element={<DiaryEntries />} />
          <Route path="/users" element={<Users />} />
          <Route path="/songs_albums" element={<SongsAlbums />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/manage" element={<Management />} />

          {/* user specific endpoints */}
          <Route path="/:userId/friends" element={<FriendsList />} />
          <Route
            path="/:userId/reports/new"
            element={<UserDiaryReportCreate />}
          />
          <Route path="/:userId/review/new" element={<UserReviewCreate />} />

          {/* admin specific endpoints */}
          <Route path="/admin/info-metrics" element={<AdminMetrics />} />
          <Route path="/admin/aggregate-metrics" element={<AdminBoard />} />
          <Route path="/admin/aggregate-graph" element={<Graph />} />

          <Route path="/" element={<Login />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        <AppFooter />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
