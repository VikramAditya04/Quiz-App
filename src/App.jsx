import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E0E10' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
