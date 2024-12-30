package com.example.hallbooking.controller;

import com.example.hallbooking.model.Booking;
import com.example.hallbooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping
    public void addBooking(@RequestBody Booking booking) {
        bookingService.insertBooking(booking);
    }

    @PutMapping("/{id}")
    public void updateBooking(@PathVariable int id, @RequestBody Booking booking) {
        bookingService.updateBooking(id, booking);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable int id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking deleted successfully.");
    }


    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
}
