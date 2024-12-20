import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  // Function to handle booking ticket
  const handleBookTicket = () => {
    navigate('/BookTicket');
  };

  // Function to handle logout and redirect to LoginPage
  const handleLogout = () => {
    // You can add code here to clear authentication tokens or session data if needed
    localStorage.removeItem("userToken"); // Example: Remove user token from localStorage

    // Redirect to the LoginPage
    navigate('/');
  };

  return (
    <div className="landing-container">
      <header className="header">
        <div className="logo">GreenTicket</div>
        <nav className="nav-links">
          <a href="#events">Events</a>
          <a href="#categories">Categories</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Logout Button */}
      </header>

      <section className="hero-section">
        <h1>Discover and Book Tickets for Amazing Events</h1>
        <p>Your gateway to concerts, sports, theater, and more.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for events, artists, or venues" />
          <button>Search</button>
        </div>
      </section>

      <section className="featured-events" id="events">
        <h2>Featured Events</h2>
        <div className="events-grid">
          <div className="event-card">
            <h3>Summer Music Fest</h3>
            <p>July 20, 2024</p>
            <button className="book-ticket-button" onClick={handleBookTicket}>Book Ticket</button>
          </div>
          <div className="event-card">
            <h3>Championship Game</h3>
            <p>August 15, 2024</p>
            <button className="book-ticket-button" onClick={handleBookTicket}>Book Ticket</button>
          </div>
          <div className="event-card">
            <h3>Broadway Show</h3>
            <p>September 5, 2024</p>
            <button className="book-ticket-button" onClick={handleBookTicket}>Book Ticket</button>
          </div>
        </div>
      </section>

      <section className="categories" id="categories">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          <div className="category-card">Concerts</div>
          <div className="category-card">Sports</div>
          <div className="category-card">Theater</div>
          <div className="category-card">Festivals</div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <p>Contact Us: info@greenticket.com | Follow us on social media</p>
      </footer>
    </div>
  );
}

export default LandingPage;
