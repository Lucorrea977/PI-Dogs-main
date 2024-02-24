import './LandingPage.css'

import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
    <div class="content">
    <h1>Welcome to the Canine Universe</h1>
    <p>Explore the World of Dogs!</p>
    <Link to="/home">
    <button className="home-button">Home</button>
    </Link>
  </div>
    </div>
  );
}

export default LandingPage;