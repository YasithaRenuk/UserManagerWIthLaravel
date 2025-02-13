import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    const { posts, auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

                {/* Add Post Button (only for users with create-post permission) */}
                {auth.user?.roles?.some(role =>
                    role.permissions?.some(permission => permission.name === 'create-post')
                ) && (
                    <Link
                        href={route('posts.create')}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mb-8 inline-block transition"
                    >
                        Add New Post
                    </Link>
                )}

                {/* List of Posts */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold">{post.title}</h2>
                            <p className="mt-3 text-gray-300">{post.body}</p>
                            <p className="text-sm text-gray-500 mt-4">
                                Posted by <span className="text-gray-400">{post.user.name}</span>
                            </p>

                            {/* Edit and Delete Buttons */}
                            <div className="mt-6 flex space-x-4">
                                {auth.user?.roles?.some(role =>
                                    role.permissions?.some(permission => permission.name === 'edit-post')
                                ) && (
                                    <Link
                                        href={route('posts.edit', post.id)}
                                        className="text-blue-400 hover:text-blue-300 transition"
                                    >
                                        Edit
                                    </Link>
                                )}

                                {auth.user?.roles?.some(role =>
                                    role.permissions?.some(permission => permission.name === 'delete-post')
                                ) && (
                                    <Link
                                        href={route('posts.destroy', post.id)}
                                        method="delete"
                                        as="button"
                                        className="text-red-400 hover:text-red-300 transition"
                                    >
                                        Delete
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
