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


function App() {
  return (
      <Router>
        <AppHeader />
        <Routes>
          {/*<Route path="/home" element={<Categories />} />*/}
          <Route path="/users" element={<Users/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Login/>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        <AppFooter />

      </Router>
  );
}

export default App;

