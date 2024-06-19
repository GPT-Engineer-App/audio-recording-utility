import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Config from "./pages/Config.jsx";
import AudioSplitter from "./pages/AudioSplitter.jsx";

function App() {
  return (
    <Router>
      <Box as="nav" w="100%" p={4} bg="teal.500" color="white">
        <Flex align="center">
          <NavLink to="/" exact>
            <Link p={2} color="white">Home</Link>
          </NavLink>
          <NavLink to="/config">
            <Link p={2} color="white">Config</Link>
          </NavLink>
          <NavLink to="/audio-splitter">
            <Link p={2} color="white">Audio Splitter</Link>
          </NavLink>
          <Spacer />
        </Flex>
      </Box>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/config" element={<Config />} />
        <Route path="/audio-splitter" element={<AudioSplitter />} />
      </Routes>
    </Router>
  );
}

export default App;