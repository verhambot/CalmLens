import React, { useState, useEffect } from 'react';

const blogs = [
    { title: "Anxiety: What Is Anxiety and its Causes, Symptoms & Types", file: '/blogs/blog1.html' },
    { title: "The Loneliness Ordeal: What It Means To Us, And How We Can Cope With It", file: '/blogs/blog2.html' },
];

const BlogPage = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogContent, setBlogContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedBlog) {
            loadBlogContent(selectedBlog.file);
        }
    }, [selectedBlog]);

    const loadBlogContent = async (file) => {
        setLoading(true);
        try {
            const response = await fetch(file);
            if (response.ok) {
                const content = await response.text();
                setBlogContent(content);
            } else {
                setBlogContent('<p>Error loading blog content.</p>');
            }
        } catch (error) {
            setBlogContent('<p>Error loading blog content.</p>');
        }
        setLoading(false);
    };

    const renderBlogContent = () => {
        if (loading) {
            return <p>Loading...</p>;
        }

        if (!selectedBlog) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                            onClick={() => setSelectedBlog(blog)}
                        >
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">
                                {blog.title}
                            </h2>
                            <p className="text-gray-700">Click to read...</p>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div
                    className="prose max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: blogContent }}
                ></div>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setSelectedBlog(null)}
                >
                    Back to Blogs
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">Blog Page</h1>
            <div className="max-w-6xl mx-auto">{renderBlogContent()}</div>
        </div>
    );
};

export default BlogPage;
