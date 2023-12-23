const bodyParser = require('body-parser');
const express = require('express')
const app = express()
app.use(bodyParser.json())

const PORT = 3001;

let rooms = [{
    roomId: "R1",
    seatsAvailable: 8,
    amanities: "Telivision, Play Station",
    pricePerHour: 600
}]

let bookings = [{
    customer: "Harikrishnan",
    date: "21/12/2023",
    startTime: "06.00pm",
    endTime: "06.00am",
    status: "Booked",
    roomId: "R1"
}]

let customers = [{
    name: "Harikrishnan",
    bookings : [{
        customer: "Harikrishnan",
        date: "21/12/2023",
        startTime: "06.00pm",
        endTime: "06.00am",
        roomId: "R1",
        status: "Booked"
    }]
}]


//API end point for Create Room
app.post("/rooms/create", (req, res) => {
    const room = req.body
    const idExists = rooms.find((rooms)=> rooms.roomId === room.roomId)
    // console.log(idExists)
    if(idExists !== undefined){
        return res.status(400).send({message:"Room already exists."});
    }
    else{
    rooms.push(room);
    res.status(201).send({message:"Room created successfully"});
}
})

//API end point for List all Rooms
app.get('/rooms/all', (req, res) => {
    try {
        res.status(200).send({
            message:"Rooms Fetched Successfully",
            totalRooms: rooms.length,
            rooms: rooms
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server Error",
            error: error.message
        })
    }
})


//Api end point for Booking Room
app.post('/booking/create/:id', (req, res) => {
  try {
    let { id } = req.params
    let bookRoom = req.body
    // Check if the room with the specified ID exists
    let room = rooms.find((room) => room.roomId === id);
    if (!room) {
      return res.status(404).send({
        message: "Room not found",
        roomlist: rooms,
      });
    }

    // Check if the room is already booked on the specified date
    let existingBookings = bookings.filter((booking) => booking.roomId === id);
    let dateCheck = existingBookings.find((data) => data.date === bookRoom.date);
    
    if (dateCheck) {
      return res.status(400).send({
        message: "Room already booked for this date",
        Bookings: bookings,
      });
    }

    // Create a new booking
    let newBooking = {...bookRoom, status: "Booked", roomId: id };
    bookings.push(newBooking);

    // Update customer details
    const customerDetails = customers.find((customerExists) => customerExists.name === newBooking.customer);
    if (customerDetails) {
      customerDetails.bookings.push(newBooking);
    } else {
      customers.push({ name: newBooking.customer, bookings: [newBooking] });
    }

    return res.status(201).send({
      message: "Room booked",
      Bookings: bookings,
      added: newBooking,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      message: "Internal server Error",
      error: error.message
    });
  }
})

//API end point for List all booked rooms
app.get('/bookings',(req,res) => {
    try {
      const bookedRooms = bookings.map((booking) => {
        const { roomId, status, customer, date, startTime, endTime } = booking;
        return {
          roomId,
          status,
          customer,
          date,
          startTime,
          endTime,
        };
      });
      res.status(201).send(bookedRooms);
    } catch (error) {
      res.status(500).send({
        message: "Internal server Error",
        error: error.message,
      });
    }
})

//API end point for List all customer with booked data
app.get("/customers", (req, res) => {
  try {
    const customerBookings = customers.flatMap((customer) => {
        const { name, bookings } = customer
        const customerDetails = bookings.map((booking) => {
            const { roomId, date, startTime, endTime } = booking
            return { name, roomId, date, startTime, endTime}
        })
        return customerDetails
    })
    res.status(200).send(customerBookings)
  } catch (error) {
    res.status(500).send({
      message: "Internal server Error",
      error: error.message,
    });
  }
});


//API end point for List how many times customer booked the room
app.get('/customers/:name', (req, res) => {
    try {
      const { name } = req.params;
      const nameExists = customers.find(customer => customer.name === name)
      if (!nameExists) {
        res.status(404).send({ 
          error: 'Customer not found' 
        });
        return;
      }
      const customerBookings = nameExists.bookings.map(booking => {
        const { customer,roomId, startTime, endTime, status, bookingDate} = booking;
        return { customer, roomId, startTime, endTime, status, bookingDate};
      });
      res.send({
          count:customerBookings.length,
          customerBookings});
    } 
    catch (error) {
      res.status(500).send({
        message: "Internal server Error",
        error: error.message,
      });
    }
})

app.listen(PORT, () => {
    console.log(`App Listining the Port ${PORT}`)
})
