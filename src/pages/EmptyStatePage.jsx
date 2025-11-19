// src/pages/EmptyStatePage.jsx
import React from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline'; // Re-using UserPlusIcon for consistency

const EmptyStatePage = ({ onNewUser }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-6 text-center">
      {/* Placeholder Illustration / Icon - using a simple circle for now */}
      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-8">
        {/* You can replace this with a more elaborate SVG or image if desired */}
        <UsersIcon className="h-16 w-16 text-gray-400" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Create a new user
      </h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        Add user details, set permissions, and assign roles to manage access within your system.
      </p>
      <button
        type="button"
        onClick={onNewUser}
        className="inline-flex items-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-150"
      >
        <UserPlusIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        New User
      </button>
    </div>
  );
};

export default EmptyStatePage;