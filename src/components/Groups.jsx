import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";


export default function Groups() {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    axios.get("https://mock-test.worthycodes.com/api/chatSystem/groups/list")
      .then((res) => {
        console.log(" Group API response:", res);
        setGroup(res.data || []);
        console.log("Group:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching group:", err);
      });
  }, []);

  return (
      <div className="bg-white shadow-md rounded-md px-4 py-1 w-[280px]  text-black">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold">
          Groups <span className="text-sm text-gray-600">({group.length})</span>
        </h2>
        <MdOutlineAddBox className="text-2xl text-gray-700 cursor-pointer hover:text-gray-100" />
      </div>
      {group.length === 0 ? (
        <p>No group loaded</p>
      ) : (
        <ul className="space-y-1">
          {group.map((group) => (
           <li
              key={group.name}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-purple-400 cursor-pointer"
            >
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold uppercase">
                {group.name.charAt(0)}
              </div>
              <span>{group.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}