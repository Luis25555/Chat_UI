import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatList({ onUserClick }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://mock-test.worthycodes.com/api/chatSystem/users/list")
      .then((res) => {
        setUsers(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-md p-4 w-[280px] text-black">
      <input
        type="text"
        placeholder="Search Contact"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />

      {users.length === 0 ? (
        <p>No users loaded</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user.username}
              onClick={() => onUserClick(user.id)}
              className="flex items-center gap-3 text-black p-2 rounded-md hover:bg-purple-400 cursor-pointer"
            >
               <img
            src={user.profileImage || "/photos/default.png"}
            alt={user.username}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/photos/default.png";
            }}
          />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center space-x-3 mt-4">
        <button type="button" className="!bg-purple-800 !text-white !px-4 !py-2 !rounded-md hover:!bg-purple-700">
          Meeting
        </button>
        <button type="button" className="!bg-gray-100 hover:!bg-gray-200 text-black px-4 py-2 rounded-md">
          Schedule
        </button>
      </div>
    </div>
  );
}
