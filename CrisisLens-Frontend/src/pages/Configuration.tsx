import React from 'react'
import { configurations } from '../data/configurations'
import ConfigBox from '../components/ConfigBox'
import {ArrowDownWideNarrow, Filter} from "lucide-react";

const Configurations = () => {

    return (
        <div>
            <div className='flex flex-row justify-between w-full p-4 rounded-xl '>
                <h1 className='text-5xl text-black font-[700] pl-4'>Scrapper Configurations</h1>
            </div>
            <div className='flex flex-wrap items-center justify-center px-8 py-4 gap-10'>
                {configurations.map((configuration, index) => (
                    <ConfigBox key={index} configuration={configuration}/>
                ))}
            </div>
        </div>
    )
}

export default Configurations