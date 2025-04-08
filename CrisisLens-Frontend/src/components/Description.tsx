// Description.tsx
import React from 'react';
import { Disaster } from '../../types/disaster';
import { FileText, MapPin, AlertTriangle, Users, Calendar } from 'lucide-react';

interface DescriptionProps {
    disasterData: Disaster;
}

const Description: React.FC<DescriptionProps> = ({ disasterData }) => {
    const formatDate = (timestamp: string): string => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className='px-4 py-6'>
            <div className='bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100'>
                <h2 className='text-xl font-bold text-gray-800 flex items-center'><FileText className='mr-2' size={22} /> Description</h2>
                <p className='text-gray-600'>{disasterData.description || 'No description available.'}</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <div className='bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100'>
                    <h2 className='text-xl font-bold text-gray-800 flex items-center'><MapPin className='mr-2' size={22} /> Affected Area</h2>
                    <p className='text-gray-600'>{disasterData.location || 'Location not specified'}</p>
                </div>
                <div className='bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100'>
                    <h2 className='text-xl font-bold text-gray-800 flex items-center'><AlertTriangle className='mr-2' size={22} /> Disaster Type</h2>
                    <p className='text-gray-600'>{disasterData.disasterType || 'Type not specified'}</p>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <div className='bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100'>
                    <h2 className='text-xl font-bold text-gray-800 flex items-center'><Users className='mr-2' size={22} /> Affected Population</h2>
                    <p className='text-gray-600'>{disasterData.affectedPopulation ? `${disasterData.affectedPopulation.toLocaleString()} people` : 'Data not available'}</p>
                </div>
                <div className='bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100'>
                    <h2 className='text-xl font-bold text-gray-800 flex items-center'><Calendar className='mr-2' size={22} /> Occurrence Date</h2>
                    <p className='text-gray-600'>{formatDate(disasterData.timestamp)}</p>
                </div>
            </div>
        </div>
    );
};

export default Description;
