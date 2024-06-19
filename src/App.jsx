import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Config from "./pages/Config.jsx";
import AudioSplitter from "./pages/AudioSplitter.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/config" element={<Config />} />
        <Route path="/audio-splitter" element={<AudioSplitter />} />
      </Routes>
    </Router>
  );
}

export default App;
