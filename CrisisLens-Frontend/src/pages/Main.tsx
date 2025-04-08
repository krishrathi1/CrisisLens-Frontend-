import React from 'react'
import Hero from '../components/main/Hero'
import Map from '../components/main/Map'

const Main = () => {
    return (
        <div className='w-full h-screen bg-gray-100 flex overflow-y-hidden'>
            <div className='w-full lg:w-1/2 bg-gray-100 border-r-2'>
                <Hero />
            </div>
            <div className='hidden lg:block w-1/2 bg-gray-100'>
                <Map />
            </div>
        </div>
    )
}

export default Main