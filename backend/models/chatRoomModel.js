// models/chatRoomModel.js
import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  user: String,
  text: String,
});

const chatRoomSchema = mongoose.Schema({
  messages: [messageSchema],
  users: [String],
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;




// import mongoose from "mongoose";
// const chatRoomSchema = mongoose.Schema(
//     {
//         messages : [String],
//         users : [String],
//     }
// );
  

//   export const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);