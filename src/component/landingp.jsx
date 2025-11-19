import React from "react";

const Newuser = ({ onAddUser }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-8">
      <div className="text-center max-w-xl">
        <h1 className="text-white text-4xl font-bold mb-4">Create a New User</h1>
        <p className="text-white text-lg mb-8">
          Add users and assign countries to get started.
        </p>

        <button
          className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
          onClick={onAddUser} // tell App to open modal
        >
          + New User
        </button>
      </div>
    </div>
  );
};

export default Newuser;
