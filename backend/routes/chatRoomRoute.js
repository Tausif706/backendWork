
import express from 'express';
import ChatRoom from '../models/chatRoomModel.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Create a new chat room and return its ID
router.post('/create', async (req, res) => {
    try {
      const { messages, users } = req.body;
  
      const newChatRoom = new ChatRoom({
        messages,
        users,
      });
  
      newChatRoom.save()
        .then((chatRoom) => {
          // Send the chat room's ID in the response
          res.status(201).json({ chatRoomId: chatRoom._id });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Failed to create a chat room.' });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create a chat room.' });
    }
  });

// Get all product listings
router.get('/list', async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find().populate('seller', 'username');
    res.status(200).json(chatRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve product listings.' });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const chatRoom = await ChatRoom.findById(id);
  
      return response.status(200).json(chatRoom);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

export default router;