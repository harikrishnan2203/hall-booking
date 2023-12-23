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

## List all Rooms
 - Method: GET
 - Endpoint: /rooms/all

## Booking Room
 - Method: POST
 - Endpoint: /booking/create/:id
 - Request Parameters: id (Room ID)
 - Request Body: JSON object representing the booking
 - Example: { "customer": "Harikrishnan", "date": "22/12/2023", "startTime": "08:00 AM", "endTime": "10:00 AM" }

## List all booked Rooms
 - Method: GET
 - Endpoint: /bookings

## List all Customers with booked data:
 - Method: GET
 - Endpoint: /customers

## Count how many times a customer booked a room:
 - Method: GET
 - Endpoint: /customers/:name
 - Request Parameters: name (Customer name)