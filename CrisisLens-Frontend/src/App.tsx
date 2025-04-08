import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import StatisticsPage from './pages/StatisticsPage'
import Configurations from './pages/Configuration'
import DisasterReport from './pages/DisasterReport'
import Virat from './pages/Virat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ResourceAll from './pages/ResourceAll'

const App = () => {
  return (
    <div className=''>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/statistics' element={<StatisticsPage/>}/>
        <Route path='/configurations' element={<Configurations/>} />
        <Route path='/disaster/:slug' element={<DisasterReport/>} />
        <Route path='/virat' element={<Virat/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/resources' element={<ResourceAll/>} />
      </Routes>
    </div>
  )
}

export default App
