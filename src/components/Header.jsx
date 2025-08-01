export default function Header() {
  return (
    <div className="bg-gray-100 text-black flex justify-between items-center px-6 py-1 shadow-sm">
      <h2 className="text-lg font-semibold pl-16">Chat</h2>
      <a href="#" className="text-blue-600 hover:underline">
        Add New Profile
      </a>
    </div>
  );
}