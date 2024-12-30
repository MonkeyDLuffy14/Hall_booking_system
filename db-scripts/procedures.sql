-- Insert booking
CREATE OR REPLACE PROCEDURE insert_booking(
    p_customer_name VARCHAR,
    p_hall_name VARCHAR,
    p_booking_date DATE,
    p_start_time TIME,
    p_end_time TIME
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO bookings (customer_name, hall_name, booking_date, start_time, end_time)
    VALUES (p_customer_name, p_hall_name, p_booking_date, p_start_time, p_end_time);
END;
$$;

-- Update booking
CREATE OR REPLACE PROCEDURE update_booking(
    p_booking_id INT,
    p_customer_name VARCHAR,
    p_hall_name VARCHAR,
    p_booking_date DATE,
    p_start_time TIME,
    p_end_time TIME
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE bookings
    SET customer_name = p_customer_name,
        hall_name = p_hall_name,
        booking_date = p_booking_date,
        start_time = p_start_time,
        end_time = p_end_time
    WHERE booking_id = p_booking_id;
END;
$$;

-- Delete booking
CREATE OR REPLACE PROCEDURE delete_booking(
    p_booking_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM bookings WHERE booking_id = p_booking_id;
END;
$$;

-- Get all bookings (returns a refcursor)
CREATE OR REPLACE FUNCTION get_all_bookings()
RETURNS TABLE (
    booking_id INT,
    customer_name VARCHAR,
    hall_name VARCHAR,
    booking_date DATE,
    start_time TIME,
    end_time TIME,
    created_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT * FROM bookings;
END;
$$;
