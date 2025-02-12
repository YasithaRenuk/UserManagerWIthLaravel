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
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Manage User Roles</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Current Role</th>
                                <th className="py-2 px-4 border-b">Change Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">
                                        {user.roles.length > 0 ? user.roles[0].name : 'No Role'}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <select
                                            defaultValue={user.roles.length > 0 ? user.roles[0].id : ''}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="border rounded p-1"
                                        >
                                            <option value="">Select Role</option>
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