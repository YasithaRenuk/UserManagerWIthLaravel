import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AdminRolesEdit() {
    const { role, permissions } = usePage().props;
    const [form, setForm] = useState({
        name: role.name,
        permissions: role.permissions.map((p) => p.id),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/admin/roles/${role.id}`, form);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-900 min-h-screen">
                <h1 className="text-3xl font-bold mb-8 text-white">Edit Role</h1>
                <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Role Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
                        <div className="grid grid-cols-2 gap-4">
                            {permissions.map((permission) => (
                                <div key={permission.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={permission.id}
                                        checked={form.permissions.includes(permission.id)}
                                        onChange={(e) => {
                                            const updatedPermissions = e.target.checked
                                                ? [...form.permissions, permission.id]
                                                : form.permissions.filter((id) => id !== permission.id);
                                            setForm({ ...form, permissions: updatedPermissions });
                                        }}
                                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2 mr-2"
                                    />
                                    <span className="text-gray-300">{permission.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        Update Role
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
