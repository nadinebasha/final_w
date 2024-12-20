import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import BookTicket from './BookTicket';
import AdminPage from './adminpage'; // Import the AdminPage component

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/BookTicket" element={<BookTicket />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Admin page route */}

        </Routes>
    </Router>
  );
}

export default App;
