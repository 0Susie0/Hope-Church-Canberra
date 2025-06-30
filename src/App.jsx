import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import LifeGroups from './pages/LifeGroups';
import Events from './pages/Events';
import VisitUs from './pages/VisitUs';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="lifegroups" element={<LifeGroups />} />
        <Route path="events" element={<Events />} />
        <Route path="visit" element={<VisitUs />} />
      </Route>
    </Routes>
  );
}

export default App; 