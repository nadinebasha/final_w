import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import `useNavigate`
import './TicketBooking.css'; // Add custom styles if needed
import axios from "axios";

// Wrapper to provide navigation for class-based components
function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class BookTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      ticketType: '',
      date: '',
    };

    // Bind methods to the class
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTicketType = this.onChangeTicketType.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeTicketType(e) {
    this.setState({ ticketType: e.target.value });
  }

  onChangeDate(e) {
    this.setState({ date: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { name, email, ticketType, date } = this.state;

    const newTicket = { name, email, ticketType, date };

    try {
      await axios.post("http://localhost:4000/api/tickets", newTicket);
      alert("Ticket booked successfully!");
      this.props.navigate("/LandingPage"); // Redirect after successful booking
    } catch (err) {
      console.error("Error booking ticket:", err);
      alert("Failed to book the ticket. Please try again.");
    }
  }

  render() {
    return (
      <div className="form-wrapper">
        <h2>Book Your Ticket</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={this.state.name}
              onChange={this.onChangeName}
              required
            />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </Form.Group>

          <Form.Group controlId="TicketType">
            <Form.Label>Ticket Type</Form.Label>
            <Form.Control
              as="select"
              value={this.state.ticketType}
              onChange={this.onChangeTicketType}
              required
            >
              <option value="">Select an option</option>
              <option value="Summer Music Fest">Summer Music Fest</option>
              <option value="Championship Game">Championship Game</option>
              <option value="Broadway Show">Broadway Show</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="Date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={this.state.date}
              onChange={this.onChangeDate}
              required
            />
          </Form.Group>

          <Button
            variant="success"
            size="lg"
            block="block"
            type="submit"
            className="mt-4"
          >
            Book Ticket
          </Button>
        </Form>
      </div>
    );
  }
}

export default withNavigation(BookTicket);
