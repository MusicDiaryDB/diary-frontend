import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AppHeader from "./pages/components/layout/AppHeader";
import AppFooter from "./pages/components/layout/AppFooter";
import Home from "./pages/Home";


function App() {
  return (
      <Router>
        <AppHeader />
        <Routes>
          {/*<Route path="/home" element={<Categories />} />*/}
          {/*<Route path="/login/" element={<Categories />} />*/}
          <Route path="/home" element={<Home/>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        {/*<AppFooter />*/}

      </Router>
  );
}

export default App;

