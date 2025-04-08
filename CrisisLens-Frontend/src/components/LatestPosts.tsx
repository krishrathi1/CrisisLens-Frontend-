import React from 'react';
import { posts } from '@/data/posts';
import { ExternalLink } from 'lucide-react';

const LatestPosts = () => {
    return (
        <div className='px-4 py-6 w-full'>
            {/* Simple header with underline effect */}
            <h2 className='text-3xl text-indigo-600 font-[900] mb-6 pb-2 border-b-2 border-blue-300'>
                Latest Posts
            </h2>
            
            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <div key={index} className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100'>
                        {/* Image with fixed height */}
                        <div className='overflow-hidden'>
                            <img
                                src={post.image}
                                alt="Post image"
                                className='w-full h-48 object-cover hover:scale-105 transition-transform duration-500'
                            />
                        </div>
                        
                        {/* Content area with consistent padding */}
                        <div className='p-4'>
                            {/* Platform badge */}
                            <div className='mb-3'>
                                <span className='bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm font-medium'>
                                    {post.platform}
                                </span>
                            </div>
                            
                            {/* Description with height limit */}
                            <p className='text-gray-800 mb-4 line-clamp-3 min-h-[72px]'>
                                {post.description}
                            </p>
                            
                            {/* Simple read more button */}
                            <a
                                href={post.source}
                                className='inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Read more
                                <ExternalLink size={14} className='ml-1' />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestPosts;