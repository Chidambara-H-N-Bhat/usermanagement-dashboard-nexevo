// src/pages/ListPage.jsx
import React from 'react';
import { EyeIcon, PencilIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import Tag from '../components/Tag'; // Assuming Tag.jsx is in components/

const ListPage = ({ users, onNewUser, onViewUser, onEditUser }) => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
                <button
                    type="button"
                    onClick={onNewUser}
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
                >
                    <UserPlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    + New User
                </button>
            </div>

            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                User Name
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                User Code
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Countries
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-indigo-50/20 transition duration-100">
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {user.userName}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {user.userCode || <span className="text-gray-400 italic">N/A</span>}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 max-w-sm">
                                    <div className="flex flex-wrap items-center">
                                        {user.countries.map((country) => (
                                            <Tag key={country.code}>{country.name}</Tag>
                                        ))}
                                    </div>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button
                                        onClick={() => onViewUser(user)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-3 p-1 rounded-full hover:bg-indigo-100 transition duration-150"
                                        title="View Details"
                                    >
                                        <EyeIcon className="h-5 w-5 inline" />
                                    </button>
                                    <button
                                        onClick={() => onEditUser(user)}
                                        className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100 transition duration-150"
                                        title="Edit User"
                                    >
                                        <PencilIcon className="h-5 w-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListPage;