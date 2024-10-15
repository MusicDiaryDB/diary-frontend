import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AppHeader from "./pages/components/layout/AppHeader";
import Home from "./pages/Home";
import Users from "./pages/Users"


function App() {
  return (
      <Router>
        <AppHeader />
        <Routes>
          {/*<Route path="/home" element={<Categories />} />*/}
          <Route path="/users" element={<Users/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        {/*<AppFooter />*/}

      </Router>
  );
}

export default App;

