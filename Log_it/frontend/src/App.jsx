import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginResult from "./pages/LoginResult";
import RecordPage from "./pages/RecordPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login-result" element={<LoginResult />} />
        <Route path="/record" element={<RecordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
