import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    hallName: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
  });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch bookings from the backend
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add or Update
  const handleSubmit = async () => {
    if (editing) {
      await axios.put(`http://localhost:8081/api/bookings/${editingId}`, formData);
      setEditing(false);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:8081/api/bookings", formData);
    }
    fetchBookings();
    setFormData({
      customerName: "",
      hallName: "",
      bookingDate: "",
      startTime: "",
      endTime: "",
    });
  };

  // Handle Edit
  const handleEdit = (booking) => {
    setEditing(true);
    setEditingId(booking.bookingId);
    setFormData({
      customerName: booking.customerName,
      hallName: booking.hallName,
      bookingDate: booking.bookingDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
    });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8081/api/bookings/${id}`);
    fetchBookings();
  };

  // Handle Cancel
  const handleCancel = () => {
    setEditing(false);
    setEditingId(null);
    setFormData({
      customerName: "",
      hallName: "",
      bookingDate: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <div className="container">
      <h1>Hall Booking Management</h1>
      <div className="form-container">
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Customer Name"
        />
        <input
          type="text"
          name="hallName"
          value={formData.hallName}
          onChange={handleChange}
          placeholder="Hall Name"
        />
        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>{editing ? "Update" : "Add"}</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Hall Name</th>
            <th>Booking Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId}>
              <td>{booking.customerName}</td>
              <td>{booking.hallName}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.startTime}</td>
              <td>{booking.endTime}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(booking)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(booking.bookingId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
