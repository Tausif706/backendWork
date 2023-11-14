import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';
import userRoute from './routes/userRoute.js'; // Import the userRoute module
import productRoute from './routes/productRoute.js';
import chatRoomRoute from './routes/chatRoomRoute.js'
import initSocketIO from './routes/socketRoute.js';
import http from 'http'

const app = express();
const server = http.createServer(app);

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/login',userRoute);
app.use('/books', booksRoute);
app.use('/product',productRoute);
app.use('/chatRoom',chatRoomRoute);

initSocketIO(server)


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
     

    // Start the server
    server.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });





  
// // Socket.io connection handling
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Join a chat room
//   socket.on('joinRoom', async ({ chatRoomId, userId }) => {
//     socket.join(chatRoomId);
//     console.log(`User ${userId} joined room ${chatRoomId}`);
//   });

//   // Send message to a chat room
//   socket.on('sendMessage', async ({ chatRoomId, userId, text }) => {
//     try {
//       // Your logic to save the message to MongoDB goes here
//       io.to(chatRoomId).emit('message', { user: userId, text });
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   // Disconnect handling
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });