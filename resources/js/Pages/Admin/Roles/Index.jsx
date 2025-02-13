import React from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminRolesIndex() {
    const { roles, permissions } = usePage().props;

    const handleDelete = (roleId) => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(`/admin/roles/${roleId}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-900 min-h-screen">
                <h1 className="text-3xl font-bold mb-8 text-white">Manage Roles</h1>
                <div className="mb-6">
                    <a
                        href="/admin/roles/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
                    >
                        Add New Role
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-700 text-sm text-left text-gray-300">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-700">Name</th>
                                <th className="py-3 px-4 border-b border-gray-700">Permissions</th>
                                <th className="py-3 px-4 border-b border-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {roles.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-800">
                                    <td className="py-3 px-4">{role.name}</td>
                                    <td className="py-3 px-4">
                                        {role.permissions.length > 0
                                            ? role.permissions.map((permission) => permission.name).join(', ')
                                            : <span className="italic text-gray-500">No Permissions</span>}
                                    </td>
                                    <td className="py-3 px-4">
                                        <a
                                            href={`/admin/roles/${role.id}/edit`}
                                            className="text-blue-400 hover:text-blue-300 mr-4 transition"
                                        >
                                            Edit
                                        </a>
                                        <button
                                            onClick={() => handleDelete(role.id)}
                                            className="text-red-400 hover:text-red-300 transition"
                                        >
                                            Delete
                                        </button>
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
