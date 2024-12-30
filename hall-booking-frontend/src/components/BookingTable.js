import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BookingTable = ({ onEdit }) => {
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings
  useEffect(() => {
    axios.get('http://localhost:8081/api/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  // Delete a booking
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/api/bookings/${id}`)
      .then(() => setBookings(bookings.filter(booking => booking.bookingId !== id)))
      .catch(error => console.error('Error deleting booking:', error));
  };

  return (
    <div>
      <h2>Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Hall Name</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId}>
              <td>{booking.bookingId}</td>
              <td>{booking.customerName}</td>
              <td>{booking.hallName}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.startTime}</td>
              <td>{booking.endTime}</td>
              <td>
                <button onClick={() => onEdit(booking)}>Edit</button>
                <button onClick={() => handleDelete(booking.bookingId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
