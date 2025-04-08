// DisasterHeader.tsx
import React from 'react';
import { Disaster } from '../types/disaster';
import { getDisasterIcon } from '../utils/disastericonmapping';
import { AlertTriangle, MapPin, Clock, Calendar, Info } from 'lucide-react';

interface DisasterHeaderProps {
    disasterData: Disaster;
}

const DisasterHeader: React.FC<DisasterHeaderProps> = ({ disasterData }) => {
    const formatDate = (timestamp: string): string => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };

    const getStatusColor = () => {
        switch (disasterData.status?.toLowerCase()) {
            case 'ongoing': return 'bg-red-500';
            case 'resolved': return 'bg-green-500';
            case 'warning': return 'bg-amber-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className='w-full bg-white shadow-lg rounded-2xl p-6 border border-gray-100'>
            <div className='flex items-start gap-6'>
                <div className='p-4 rounded-full bg-white shadow-md'>
                    <img className='w-16 h-16 object-contain' src={getDisasterIcon(disasterData.disasterType.toLowerCase())} alt={disasterData.disasterType} />
                </div>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>{disasterData.title}</h1>
                    <div className='flex items-center space-x-2 bg-blue-50 p-2 rounded-lg'>
                        <AlertTriangle className='text-indigo-600' size={20} />
                        <span className={`w-3 h-3 rounded-full ${getStatusColor()}`}></span>
                        <span className='font-semibold text-gray-700'>{disasterData.status || 'Unknown'}</span>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                <div className='flex items-center bg-blue-50 p-3 rounded-lg'>
                    <Info className='text-indigo-600' size={24} />
                    <span className='ml-2 font-semibold'>{disasterData.disasterType}</span>
                </div>
                <div className='flex items-center bg-blue-50 p-3 rounded-lg'>
                    <MapPin className='text-indigo-600' size={24} />
                    <span className='ml-2 font-semibold'>{disasterData.location}</span>
                </div>
                <div className='flex items-center bg-blue-50 p-3 rounded-lg'>
                    <Clock className='text-indigo-600' size={24} />
                    <span className='ml-2 font-semibold'>{formatDate(disasterData.updatedAt || disasterData.timestamp)}</span>
                </div>
            </div>
        </div>
    );
};

export default DisasterHeader;
