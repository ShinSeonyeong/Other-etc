import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginResult from "./pages/LoginResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login-result" element={<LoginResult />} />
      </Routes>
    </Router>
  );
}

export default App;
