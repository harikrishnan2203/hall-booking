## Room Booking System

This is a simple Room Booking System implemented using Node.js and Express.

## Features

- Create a Room
- List all rooms
- Book a room and prevent double booking
- List all booked rooms
- List all customers with booked data
- Count how many times a customer booked a room

## API Endpoints
## Create Room
 - Method: POST
 - Endpoint: /rooms/create
 - Request Body: JSON object representing the room
 - Example: { "roomId": "R2", "seatsAvailable": 10, "amenities": "Telivision", "pricePerHour": 800 }
 - https://hall-booking-api-ggft.onrender.com/rooms/create

## List all Rooms
 - Method: GET
 - Endpoint: /rooms/all
 - https://hall-booking-api-ggft.onrender.com/rooms/all

## Booking Room
 - Method: POST
 - Endpoint: /booking/create/:id
 - Request Parameters: id (Room ID)
 - Request Body: JSON object representing the booking
 - Example: { "customer": "Harikrishnan", "date": "22/12/2023", "startTime": "08:00 AM", "endTime": "10:00 AM" }
 - https://hall-booking-api-ggft.onrender.com/booking/create/R3

## List all booked Rooms
 - Method: GET
 - Endpoint: /bookings
 - https://hall-booking-api-ggft.onrender.com/bookings

## List all Customers with booked data:
 - Method: GET
 - Endpoint: /customers
 - https://hall-booking-api-ggft.onrender.com/customers

## Count how many times a customer booked a room:
 - Method: GET
 - Endpoint: /customers/:name
 - Request Parameters: name (Customer name)
 - https://hall-booking-api-ggft.onrender.com/customer/:name
 - https://hall-booking-api-ggft.onrender.com/customers/Harikrishnan


## Postman Documentation Link
 - https://documenter.getpostman.com/view/31850761/2s9YsDjZnr#13efc701-acab-4aae-9c0e-7909c5bf44d4