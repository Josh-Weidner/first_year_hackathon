import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Features from "./pages/Features.tsx";
import Results from "./pages/Results.tsx";
import Questions from "./pages/Questions.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Features" element={<Features />} />
      <Route path="/Results" element={<Results />} />
      <Route path="/Questions" element={<Questions />} />
    </Routes>
  );
}

export default App;