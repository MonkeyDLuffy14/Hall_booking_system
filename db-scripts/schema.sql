-- Create the database
CREATE DATABASE hall_booking;

-- Connect to the database
\c hall_booking;

-- Create the bookings table
CREATE TABLE bookings (
    booking_date date NOT NULL,
    end_time time without time zone NOT NULL,
    created_at timestamp without time zone,
    booking_id integer NOT NULL,
    start_time time without time zone NOT NULL,
    customer_name varchar NOT NULL,
    hall_name varchar NOT NULL
);
