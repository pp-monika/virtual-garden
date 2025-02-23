import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import StatePage from "./pages/StatePage";
import HerbPage from './pages/HerbPage';

import ProfilePage from './pages/ProfilePage';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state/:stateName" element={<StatePage />} />
        <Route path="/herb/:herbId" element={<HerbPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
