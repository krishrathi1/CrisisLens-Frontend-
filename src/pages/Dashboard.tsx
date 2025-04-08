import React from 'react'
import Main from './Main'
import { Navbar } from '@/components/Navbar'

const Dashboard = () => {
  return (
    <div className='flex flex-col relative top-20'>
      <Navbar/>
      <Main/>
    </div>
  )
}

export default Dashboard
