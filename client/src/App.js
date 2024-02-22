import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CreateDog from './components/CreateDog/CreateDog.jsx';
import Details from './components/Details/Details.jsx';

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateDog />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    
  );
}

export default App;