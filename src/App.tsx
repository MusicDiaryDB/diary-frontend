import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AppHeader from "./pages/components/layout/AppHeader";
import { useParams, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import AppFooter from "./pages/components/layout/AppFooter";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import UserSettings from "./pages/UserSettings";
import Management from "./pages/Management";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SongsAlbums from "./pages/SongsAlbums";
import FriendsList from "./pages/FriendsList";
import UserNavBar from "./pages/components/layout/UserNavBar";
import FriendReviews from "./pages/FriendsReviews";
import FriendsDiaryEntries from "./pages/FriendsEntries";
import FriendsDiaryReports from "./pages/FriendsDiaryReports";
import Graph from "./pages/Graph";
import AdminBoard from "./pages/AdminBoard";
import AdminMetrics from "./pages/AdminMetrics";
import UserDiaryReportCreate from "./pages/UserDiaryReportCreate";
import UserReviewCreate from "./pages/UserReviewCreate";
import UserReviews from "./pages/UserReviews";
import LandingPage from "./pages/Landing";
import AdminNavBar from "./pages/components/layout/AdminNavBar";
import UserDiaryReports from "./pages/UserDiaryReports";
import UserDiaryReport from "./pages/UserDiaryReport";
import SongsPage from "./pages/Songs";
import AlbumsPage from "./pages/Albums";
import ArtistsPage from "./pages/Artists";
import MusicCardsPage from "./pages/AllMusic";
import AdminReviews from "./pages/AdminReviews";
import AdminReports from "./pages/AdminReports";
import UserDiaryEntries from "./pages/UserDiaryEntries";
import AdminEntries from "./pages/AdminEntries";
import UserInsights from "./pages/UserInsights";

// Helper function to determine if the current route is an admin route
const isAdminRoute = (pathname: string) => {
  return (
      pathname.startsWith("/admin") ||
      pathname === "/users" ||
      pathname === "/songs_albums" ||
      pathname === "/reviews"
  );
};

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
          <MainWrapper />
          <AppFooter />
        </Router>
      </QueryClientProvider>
  );
}

const MainWrapper = () => {
  const location = useLocation(); // Get the current route
  const admin = isAdminRoute(location.pathname);

  return (
      <div>
        {/* Conditionally render AdminNavBar or nothing */}
        {admin ? <AdminNavBar /> : <Outlet />}
        <Routes>
          {/* General pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element ={<Registration />} />

          {/* Landing page and fallback */}
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<div>Page Not Found</div>} />

          {/* User-specific routes */}
          <Route path="/user/:userId/*" element={<NavbarWrapper />}>
            <Route path="home" element={<Home />} />
            <Route path="friends" element={<FriendsList />} />
            <Route path="reviews" element={<UserReviews />} />
            <Route path="friends/reviews" element={<FriendReviews />} />
            <Route path="friends/reports" element={<FriendsDiaryReports />} />
            <Route path="friends/entries" element={<FriendsDiaryEntries />} />
            <Route path="reports" element={<UserDiaryReports />} />
            <Route path="reports/new" element={<UserDiaryReportCreate />} />
            <Route path="review/new" element={<UserReviewCreate />} />
            <Route path="report/:reportId" element={<UserDiaryReport />} />
            <Route path="entries" element={<UserDiaryEntries />} />
            <Route path="insights" element={<UserInsights />} />
            <Route path="settings" element={<UserSettings />} />
            <Route
                path="friends/reports/report/:reportId"
                element={<UserDiaryReport />}
            />

            <Route path="music/all" element={<MusicCardsPage />} />
            <Route path="music/songs" element={<SongsPage />} />
            <Route path="music/albums" element={<AlbumsPage />} />
            <Route path="music/artists" element={<ArtistsPage />} />
          </Route>

          {/* Admin-specific routes */}
          <Route path="/manage" element={<Management />} />
          <Route path="/admin/manage/reviews" element={<AdminReviews />} />
          <Route path="/admin/manage/entries" element={<AdminEntries />} />
          <Route path="/admin/manage/users" element={<Users />} />
          <Route path="/admin/manage/reports" element={<AdminReports />} />
          <Route path="/admin/manage/songs_albums" element={<SongsAlbums />} />
          <Route path="/admin/info-metrics" element={<AdminMetrics />} />
          <Route path="/admin/aggregate-metrics" element={<AdminBoard />} />
          <Route path="/admin/aggregate-graphs" element={<Graph />} />
        </Routes>
      </div>
  );
};

const NavbarWrapper = () => {
  const { userId } = useParams(); // Get user id
  return (
      <div>
        {userId && <UserNavBar userId={userId} />}
        <Outlet /> {/* This renders the child routes */}
      </div>
  );
};

export default App;