import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap'; // Bootstrap for styling
import './AdminPage.css'; // Import custom CSS

const AdminPage = () => {
    const [tickets, setTickets] = useState([]); // Store tickets in state
    const [loading, setLoading] = useState(true); // Handle loading state
    const [error, setError] = useState(''); // Handle errors
  
    // Fetch all tickets when the component mounts
    useEffect(() => {
      axios
        .get('http://localhost:4000/api/tickets') // Endpoint to get all tickets
        .then((response) => {
          setTickets(response.data); // Set the ticket data
          setLoading(false); // Set loading to false
        })
        .catch((err) => {
          setError('Error fetching tickets.'); // Handle error
          setLoading(false); // Set loading to false
        });
    }, []); // Empty dependency array means it runs once when component mounts
  
    // Delete a ticket by ID
    const handleDelete = (ticketId) => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
        axios
          .delete(`http://localhost:4000/api/tickets/${ticketId}`) // Endpoint to delete ticket
          .then((response) => {
            setTickets(tickets.filter((ticket) => ticket._id !== ticketId)); // Remove deleted ticket from state
            alert('Ticket deleted successfully!');
          })
          .catch((err) => {
            setError('Error deleting ticket.'); // Handle error
          });
      }
    };
  
    return (
      <Container>
        <h2 className="my-4">Admin - View All Booked Tickets</h2>
        
        {loading ? (
          <p>Loading...</p> // Show loading message
        ) : error ? (
          <p className="text-danger">{error}</p> // Show error message
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Ticket Type</th>
                <th>Date</th>
                <th>Actions</th> {/* Added column for actions */}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.name}</td>
                  <td>{ticket.email}</td>
                  <td>{ticket.ticketType}</td>
                  <td>{new Date(ticket.date).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(ticket._id)} // Call handleDelete on click
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    );
  };

export default AdminPage;
