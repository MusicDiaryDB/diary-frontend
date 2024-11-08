import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AppHeader from "./pages/components/layout/AppHeader";
import Home from "./pages/Home";
import Users from "./pages/Users"
import AppFooter from "./pages/components/layout/AppFooter";
import Login from "./pages/Login";
import DiaryEntries from "./pages/DiaryEntries";
import Management from "./pages/Management";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SongsAlbums from "./pages/SongsAlbums";
import FriendsList from "./pages/FriendsList";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            refetchOnWindowFocus: false,
        },
    },
})

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <Router>
              <AppHeader />
              <Routes>
                  <Route path="/entries" element={<DiaryEntries />} />
                  <Route path="/users" element={<Users/>} />
                  <Route path="/songs_albums" element={<SongsAlbums/>} />
                  <Route path="/home" element={<Home/>} />
                  <Route path="/manage" element={<Management/>} />
                  <Route path="/user_friends/:userId" element={<FriendsList />} />

                  <Route path="/" element={<Login/>} />
                  <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>

              <AppFooter />

          </Router>
      </QueryClientProvider>
  );
}

export default App;

