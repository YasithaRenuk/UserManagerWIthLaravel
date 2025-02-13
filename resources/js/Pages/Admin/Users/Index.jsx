import React from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminUsersIndex() {
    const { users, roles } = usePage().props;

    const handleRoleChange = (userId, roleId) => {
        router.put(`/admin/users/${userId}/update-role`, { role_id: roleId });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-900 min-h-screen">
                <h1 className="text-3xl font-bold mb-8 text-white">Manage User Roles</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-700 text-sm text-left text-gray-300">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-700">Name</th>
                                <th className="py-3 px-4 border-b border-gray-700">Email</th>
                                <th className="py-3 px-4 border-b border-gray-700">Current Role</th>
                                <th className="py-3 px-4 border-b border-gray-700">Change Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-800">
                                    <td className="py-3 px-4">{user.name}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">
                                        {user.roles.length > 0 ? user.roles[0].name : <span className="italic text-gray-500">No Role</span>}
                                    </td>
                                    <td className="py-3 px-4">
                                        <select
                                            defaultValue={user.roles.length > 0 ? user.roles[0].id : ''}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="" className="text-gray-400">Select Role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
