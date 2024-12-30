package com.example.hallbooking.repository;

import com.example.hallbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
	 @Procedure(procedureName = "insert_booking")
	    void insertBooking(
	        @Param("p_customer_name") String p_customer_name,
	        @Param("p_hall_name") String p_hall_name,
	        @Param("p_booking_date") java.sql.Date p_booking_date,
	        @Param("p_start_time") java.sql.Time p_start_time,
	        @Param("p_end_time") java.sql.Time p_end_time
	    );
	 @Procedure(procedureName = "update_booking")
	 void updateBooking(
	     @Param("p_booking_id") int bookingId,
	     @Param("p_customer_name") String customerName,
	     @Param("p_hall_name") String hallName,
	     @Param("p_booking_date") java.sql.Date bookingDate,
	     @Param("p_start_time") java.sql.Time startTime,
	     @Param("p_end_time") java.sql.Time endTime
	 );

	 @Procedure(procedureName = "delete_booking")
	 void deleteBooking(@Param("p_booking_id") int bookingId);


    @Query(value = "SELECT * FROM get_all_bookings();", nativeQuery = true)
    List<Booking> getAllBookings();

}
