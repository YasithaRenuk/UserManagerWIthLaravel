import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EditPost() {
    const { post } = usePage().props;
    const [form, setForm] = useState({
        title: post.title,
        body: post.body,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route('posts.update', post.id), form);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
                <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter post title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Body</label>
                        <textarea
                            value={form.body}
                            onChange={(e) => setForm({ ...form, body: e.target.value })}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                            placeholder="Write your post here..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Update Post
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
