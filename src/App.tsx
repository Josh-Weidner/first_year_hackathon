import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Features from "./pages/Features.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Features" element={<Features />} />
      <Route path="/Features" element={<Features />} />
    </Routes>
  );
}

export default App;