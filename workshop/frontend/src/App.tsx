import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Module from './pages/Module';
import Hackathon from './pages/Hackathon';
import Guide from './pages/Guide';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/module/:id" element={<Module />} />
        <Route path="/hackathon" element={<Hackathon />} />
        <Route path="/guide" element={<Guide />} />
      </Route>
    </Routes>
  );
}
