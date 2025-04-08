"use client";
import React, { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch';

interface ConfigBoxProps {
    configuration: {
        scraper: string;
        description: string;
        status: boolean;
        icon: string;
        speed: number;
    };
}

const ConfigBox = ({ configuration }: ConfigBoxProps) => {
    const [status, setStatus] = useState(configuration.status);
    const[value, setValue] = useState(configuration.speed+"");
    return (
        <div className='flex flex-col justify-between w-[30rem] h-[20rem] cursor-pointer rounded-xl border border-gray-300 p-6 shadow-lg hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 ease-in-out'>
            {/* Row 1: Logo and Toggle */}
            <div className='flex justify-between items-center'>
                <img
                    src={configuration.icon}
                    alt={configuration.scraper}
                    className='max-w-full max-h-16 object-contain'
                />
                <ToggleSwitch status={status} setStatus={setStatus} />
            </div>

            {/* Row 2: Name and Description */}
            <div className='mt-4 flex flex-col'>
                <h2 className='text-2xl font-[1000] py-2'>{configuration.scraper}</h2>
                <p className='text-sm text-gray-500 py-2'>{configuration.description}</p>
            </div>

            <div>
                <input type="range" min={1} max={20} onChange={(e)=>{setValue(e.currentTarget.value)}} defaultValue={value}></input>
            </div>

            {/* Bottom: Status and Speed */}
            <div className=' flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <span className={`h-4 w-4 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className='text-sm font-medium'>{status ? 'Active' : 'Inactive'}</span>
                </div>
                <span className='text-gray-500 text-sm'>{`Speed: ${value}ms`}</span>
            </div>
        </div>
    );
};

export default ConfigBox;
