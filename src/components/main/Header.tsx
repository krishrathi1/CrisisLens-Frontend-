import { useDisasterStore } from '../../zustand/useDisasterStore'
import { ArrowDownWideNarrow, Filter } from 'lucide-react'
import React from 'react'

const FilterSection = () => {
  const section = useDisasterStore((state) => state.section)
  
  return (
    <div className='bg-gradient-to-r from-blue-50 to-blue-100 shadow-md rounded-2xl p-6 mb-4 flex flex-row items-center justify-between w-full'>
      <div className='flex flex-col'>
        <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2'>
          Ongoing Disasters
        </h1>
        <p className='text-gray-500 text-sm pl-1'>Real-time global disaster tracking</p>
      </div>
      
      {section === "disasters" && (
        <div className='flex items-center space-x-4'>
          <button className='group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-white border border-gray-200 px-5 py-3 rounded-xl flex items-center gap-3 text-blue-600 hover:text-blue-800'>
            <Filter className='w-5 h-5 group-hover:rotate-12 transition-transform' />
            <span className='font-semibold'>Filter</span>
          </button>
          
          <button className='group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-white border border-gray-200 px-5 py-3 rounded-xl flex items-center gap-3 text-green-600 hover:text-green-800'>
            <ArrowDownWideNarrow className='w-5 h-5 group-hover:rotate-6 transition-transform' />
            <span className='font-semibold'>Sort</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default FilterSection