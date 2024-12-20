const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();

// MongoDB connection
const uri = "mongodb+srv://nadinebasha2006:Nad.1212@cluster0.tukue.mongodb.net/";

// Replace <db_password> with your actual database password
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// MongoDB Schema and Model for Tickets
const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  ticketType: { type: String, required: true },
  date: { type: Date, required: true }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Received data:", { email, password });

  res.send({ message: "Login successful.", user: { email: email || "unknown" } });
});

// API Routes for Tickets
// Create a new ticket
router.post("/api/tickets", async (req, res) => {
  const { name, email, ticketType, date } = req.body;

  const newTicket = new Ticket({
    name,
    email,
    ticketType,
    date
  });

  try {
    const savedTicket = await newTicket.save();
    res.status(201).json({ message: "Ticket booked successfully.", ticket: savedTicket });
  } catch (err) {
    console.error("Error booking ticket:", err);
    res.status(500).json({ error: "Failed to book ticket." });
  }
});

// Get all tickets
router.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets." });
  }
});

// Delete a ticket by ID
router.delete("/api/tickets/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    await Ticket.findByIdAndDelete(ticketId);
    res.status(200).json({ message: "Ticket deleted successfully." });
  } catch (err) {
    console.error("Error deleting ticket:", err);
    res.status(500).json({ error: "Failed to delete ticket." });
  }
});

// Update a ticket by ID
router.put("/api/tickets/:id", async (req, res) => {
  const { name, email, ticketType, date } = req.body;

  try {
    const ticketId = req.params.id;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { name, email, ticketType, date },
      { new: true, runValidators: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    res.status(200).json({ message: "Ticket updated successfully.", ticket: updatedTicket });
  } catch (err) {
    console.error("Error updating ticket:", err);
    res.status(500).json({ error: "Failed to update ticket." });
  }
});
router.get("/api/admin/tickets", async (req, res) => {
    try {
      // Fetch all tickets and display user info (name, email, ticketType, date)
      const tickets = await Ticket.find();
      res.status(200).json(tickets);
    } catch (err) {
      console.error("Error fetching tickets for admin:", err);
      res.status(500).json({ error: "Failed to fetch tickets for admin." });
    }
  });
  router.delete("/api/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found." });
      }
  
      res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Failed to delete user." });
    }
  });const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
