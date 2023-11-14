// // socketIORoute.js
// import { Server } from 'socket.io';

// const initSocketIO = (httpServer) => {
// //   const io = new Server(httpServer);
//   const io = new Server(httpServer, {
//     cors: {
//       origin: '*',
//       methods: ['GET', 'POST' , 'websocket'],
//     }
//   });

//   io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Join a chat room
//     socket.on('joinRoom', async ({ chatRoomId, userId }) => {
//       socket.join(chatRoomId);
//       console.log(`User ${userId} joined room ${chatRoomId}`);
//     });

//     // Send message to a chat room
//     socket.on('sendMessage', async ({ chatRoomId, userId, text }) => {
//       try {
//         // Your logic to save the message to MongoDB goes here
//         io.to(chatRoomId).emit('message', { user: userId, text });
//       } catch (error) {
//         console.error("the error found is ",error);
//       }
//     });

//     // Disconnect handling
//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });
// };

// export default initSocketIO;




// routes/socketIORoute.js
import { Server } from 'socket.io';
import ChatRoom from '../models/chatRoomModel.js'; // Import the ChatRoom model

const initSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'websocket'],
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Join a chat room
    socket.on('joinRoom', async ({ chatRoomId, userId }) => {
      socket.join(chatRoomId);
      console.log(`User ${userId} joined room ${chatRoomId}`);
    });

    // Send message to a chat room
    socket.on('sendMessage', async ({ chatRoomId, userId, text }) => {
      try {
        // Save the message to MongoDB
        const chatRoom = await ChatRoom.findOneAndUpdate(
          { _id: chatRoomId },
          {
            $push: { messages: { user: userId, text: text } },
          },
          { new: true }
        );

        // Emit the message to all users in the chat room
        io.to(chatRoomId).emit('message', { user: userId, text });

        console.log(`Message saved in room ${chatRoomId} from user ${userId}: ${text}`);
      } catch (error) {
        console.error("Error:", error);
      }
    });

    // Disconnect handling
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

export default initSocketIO;
