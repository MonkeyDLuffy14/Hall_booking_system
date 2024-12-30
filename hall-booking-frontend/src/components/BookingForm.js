import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = ({ selectedBooking, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    hallName: '',
    bookingDate: '',
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    if (selectedBooking) {
      setFormData(selectedBooking);
    }
  }, [selectedBooking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBooking) {
      axios.put(`http://localhost:8081/api/bookings/${selectedBooking.bookingId}`, formData)
        .then(() => onSuccess())
        .catch(error => console.error('Error updating booking:', error));
    } else {
      axios.post('http://localhost:8081/api/bookings', formData)
        .then(() => onSuccess())
        .catch(error => console.error('Error adding booking:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedBooking ? 'Edit Booking' : 'Add Booking'}</h2>
      <input type="text" name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} required />
      <input type="text" name="hallName" placeholder="Hall Name" value={formData.hallName} onChange={handleChange} required />
      <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} required />
      <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
      <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
      <button type="submit">{selectedBooking ? 'Update Booking' : 'Add Booking'}</button>
    </form>
  );
};

export default BookingForm;
