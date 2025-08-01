import { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneFlip } from "react-icons/fa6";
import { CiVideoOn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineUnderline } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { RiFontColor } from "react-icons/ri";
import { FaLink } from "react-icons/fa";


export default function Chat({ selectedUserId }) {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUserId = 5;
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {
  if (!selectedUserId) return;

  // Fetch selected user's full details
  axios
    .get("https://mock-test.worthycodes.com/api/chatSystem/users/list")
    .then((res) => {
      console.log("User list response:", res.data); // Debug
      const userList = res.data?.data ?? res.data; // fallback if data is not nested
      const user = Array.isArray(userList)
        ? userList.find((u) => u.id === selectedUserId)
        : null;
      setSelectedUser(user);
      console.log("selected userID",selectedUserId);
    })
    .catch((err) => {
      console.error("Failed to fetch user list", err);
    });

  // Fetch chat messages
  axios
    .get(`https://mock-test.worthycodes.com/api/chatSystem/chatByUserId/${selectedUserId}`)
    .then((res) => {
      const fetchedMessages = res.data || [];
      console.log("message: ",fetchedMessages);
      const filtered = fetchedMessages.filter(
        (msg) =>
          (msg.fromUser === currentUserId && msg.toUser === selectedUserId) ||
          (msg.fromUser === selectedUserId && msg.toUser === currentUserId)
      );
      setMessages(filtered);
    })
    .catch((err) => {
      console.error("Failed to load chat messages", err);
    });
}, [selectedUserId]);

//Send  Message
const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!newMessage.trim()) return;

  const messageData = {
    fromUser: currentUserId,
    toUser: selectedUserId,
    message: newMessage,
  };

  try {
    axios.post('/api/chatSystem/chat/add', {
  fromUser: currentUserId,
  toUser: selectedUserId,
  message: newMessage
});
    console.log("Sent Message",messageData);

    // Optimistically update the chat with the sent message
    const newMsgObject = {
      id: Date.now(), // temporary unique ID
      ...messageData,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMsgObject]);
    setNewMessage("");
  } catch (err) {
    console.error("Failed to send message:", err);
  }
};

//rendering starts here
  return (
    //chat header block
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col max-h-[93%] h-[93%] ">
      {selectedUser && (
  <div className="flex justify-between items-center mb-4 bg-purple-100">
  {/* Left: User Info */}
  {selectedUser && (
    <div className="flex items-center gap-4 ">
      <img
        src={selectedUser.profileImage}
        alt={selectedUser.username}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h2 className="text-lg font-bold text-black">{selectedUser.username}</h2>
        <p className="text-sm text-gray-500">{selectedUser.position}</p>
      </div>
    </div>
  )}

  {/* Right: Search Input */}
 <div className="flex gap-1 justify-between items-center my-2 mx-0.5">
  
  <input
    type="text"
    placeholder="Search messages..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none w-60 bg-gray-100 text-gray-600"
  />

  {/*  icons */}
  <div className="w-10 h-10 rounded-full border-1 border-purple-400 bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition pt-0.5">
    <FaPhoneFlip className="text-xl text-purple-700 " title="Phone" />
     
  </div>
  <div className="w-10 h-10 rounded-full border-1 border-purple-400 bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition pt-0.5">
   <CiVideoOn className="text-xl text-purple-700 " title="Video"/> 
     
  </div>
  <div className="w-10 h-10 rounded-full border-1 border-purple-400 bg-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-200 transition pt-0.5">
   <BsThreeDotsVertical  className="text-xl text-purple-700 " title="Settings"/> 
     
  </div>
</div>
</div>
)}

{!selectedUser && selectedUserId && (
  <h2 className="text-xl text-black font-bold mb-4 ">
    Chat with User {selectedUserId}
  </h2>
)}

{!selectedUserId && (
  <h2 className="text-xl text-black font-bold mb-4">Select a user</h2>
)}

      {/* Messages */}
<div className="flex-1 overflow-y-auto space-y-4">
  {messages.map((msg) => {
    const isMe = msg.fromUser === currentUserId;
    const user = selectedUser; // Assuming `users` is loaded from API
    const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <div key={msg.id} className={`text-black flex ${isMe ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-[70%]">
          {/* Sender Info */}
        {!isMe && (
      <div className="flex items-center gap-2 text-xs mb-1">
        <img
          src={user?.profileImage}
          alt="avatar"
          className="w-6 h-6 rounded-full object-cover"
        />
        <div>
          <span className="font-semibold">{user?.username || "Unknown"}</span>
          <div className="text-gray-500">{formattedTime}</div>
        </div>
      </div>
    )}

    {isMe && (
      <div className="flex items-center gap-2 text-xs mb-1 justify-end text-right">
        <div>
          <span className="font-semibold text-purple-700">You</span>
          <div className="text-gray-500">{formattedTime}</div>
        </div>
        {/* Optional: your own avatar */}
        {/* <img src={currentUser?.profileImage} className="w-6 h-6 rounded-full" /> */}
      </div>
    )}

          {/* Message Box */}
          <div
            className={`px-4 py-2 rounded-lg ${
              isMe
                ? 'bg-purple-700 text-white rounded-br-none'
                : 'bg-gray-300 text-black rounded-bl-none'
            }`}
          >
            <div className="break-words whitespace-pre-wrap">
              {typeof msg.message === "string" && msg.message.trim() !== "" && (
                <p>{msg.message}</p>
              )}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="attachment"
                  className="mt-2 max-w-[300px] rounded shadow"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>
{/* send message form*/ }
<form
  onSubmit={handleSendMessage}
  className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-3"
>
  {/* Input box */}
  <input
    type="text"
    placeholder="Type a message..."
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    className="flex-1  rounded-lg px-4 py-2 text-black"
  />

  {/* Icons: Emoji, Attachment, Image */}
  <div className="flex gap-2 text-xl text-gray-500">
     <MdAlternateEmail className="cursor-pointer hover:text-purple-600" title="@" />
    <RiFontColor className="cursor-pointer hover:text-purple-600" title="Underline Text" />
    <MdAttachFile className="cursor-pointer hover:text-purple-600 rotate-45" title="Attach File" />
    <BsEmojiSmile className="cursor-pointer hover:text-purple-600" title="Emoji" />
    <BsImage className="cursor-pointer hover:text-purple-600" title="Insert Image" />
    <FaLink className="cursor-pointer hover:text-purple-600" title="Link" />
    
  </div>

  {/* Send button */}
  <button
    type="submit"
    className="!bg-purple-700 text-white p-2 rounded-full hover:!bg-purple-800"
  >
    <IoIosSend className="text-2xl" />
  </button>
</form>
            </div>
          
        
      
  );
}