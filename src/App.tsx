import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PersonalCabinet from "./pages/PersonalCabinet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/personal-cabinet" element={<PersonalCabinet />} />
      </Routes>
    </Router>
  );
}

export default App;