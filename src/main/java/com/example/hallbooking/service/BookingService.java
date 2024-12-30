package com.example.hallbooking.service;

import com.example.hallbooking.model.Booking;
import com.example.hallbooking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public void insertBooking(Booking booking) {
        validateBooking(booking);
        bookingRepository.insertBooking(
            booking.getCustomerName(),
            booking.getHallName(),
            Date.valueOf(booking.getBookingDate()),  // Converts to java.sql.Date
            Time.valueOf(booking.getStartTime()),    // Converts to java.sql.Time
            Time.valueOf(booking.getEndTime())       // Converts to java.sql.Time
        );
    }

    public void updateBooking(int id, Booking booking) {
        validateBooking(booking);
        bookingRepository.updateBooking(
            id,
            booking.getCustomerName(),
            booking.getHallName(),
            Date.valueOf(booking.getBookingDate()),  // Converts to java.sql.Date
            Time.valueOf(booking.getStartTime()),    // Converts to java.sql.Time
            Time.valueOf(booking.getEndTime())       // Converts to java.sql.Time
        );
    }

    public void deleteBooking(int bookingId) {
        if (bookingId <= 0) {
            throw new IllegalArgumentException("Invalid booking ID: " + bookingId);
        }
        bookingRepository.deleteBooking(bookingId);
    }


    public List<Booking> getAllBookings() {
        return bookingRepository.getAllBookings();
    }

    private void validateBooking(Booking booking) {
        if (booking.getCustomerName() == null || booking.getCustomerName().isEmpty()) {
            throw new IllegalArgumentException("Customer name cannot be null or empty.");
        }
        if (booking.getHallName() == null || booking.getHallName().isEmpty()) {
            throw new IllegalArgumentException("Hall name cannot be null or empty.");
        }
        if (booking.getBookingDate() == null) {
            throw new IllegalArgumentException("Booking date cannot be null.");
        }
        if (booking.getStartTime() == null || booking.getEndTime() == null) {
            throw new IllegalArgumentException("Start and end times cannot be null.");
        }
    }
}
