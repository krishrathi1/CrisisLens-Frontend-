import ChatRoom from '@/components/main/ChatRoom'
import React from 'react'

const ResourceAll = () => {
    return (
        <div className='flex h-screen'>
            <iframe title="resource alocation" width="1000" height="1000" src="https://app.powerbi.com/view?r=eyJrIjoiNjAyOTQwNDgtOWUyYS00YTVkLThjZGUtM2IwY2QwYjY5MDAwIiwidCI6IjE1MTAzYzk2LTU1NTAtNGVlNC1iZWVjLTU0MzRmMjI5ZWQwYiJ9" frameborder="0" allowFullScreen="true"></iframe>
            <ChatRoom/>
        </div>
    )
}

export default ResourceAll
