import React from 'react';
import { Disaster } from '@/types/disaster';
import { getDisasterIcon } from '../../utils/disastericonmapping';
import { useDisasterStore } from '../../zustand/useDisasterStore';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';

interface DisasterProps {
    disasterData: Disaster;
}

export function DisasterCard({ disasterData }: DisasterProps) {
    const setSection = useDisasterStore((state) => state.setSection);
    const setSelectedDisaster = useDisasterStore((state) => state.setSelectedDisaster);

    const formatDate = (timestamp: string): string => {
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return date.toLocaleString('en-US', options);
    };

    const handleSectionChange = () => {
        setSection('disasterinfo');
        setSelectedDisaster(disasterData);
    };

    // Determine status color based on disaster status
    const getStatusColor = () => {
        switch (disasterData.status?.toLowerCase()) {
            case 'ongoing': return 'bg-red-500';
            case 'resolved': return 'bg-green-500';
            case 'warning': return 'bg-amber-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div 
            onClick={handleSectionChange} 
            className='group mt-2 relative w-full p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.02] border border-gray-100'
        >
            {/* Gradient Background Overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 rounded-2xl pointer-events-none'></div>

            {/* Content Container */}
            <div className='relative z-10'>
                {/* Disaster Icon and Title Section */}
                <div className='flex items-center space-x-4 mb-5'>
                    <div className='bg-white p-3 rounded-full shadow-md'>
                        <img 
                            className='w-12 h-12 object-contain' 
                            src={getDisasterIcon(disasterData?.disasterType?.toLowerCase())} 
                            alt="Disaster Icon" 
                        />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors'>
                            {disasterData.title}
                        </h2>
                    </div>
                </div>

                {/* Disaster Details */}
                <div className='space-y-3'>
                    {/* Status */}
                    <div className='flex items-center space-x-3 bg-blue-50 p-2 rounded-lg'>
                        <AlertTriangle className='text-indigo-600' size={24} />
                        <div className='flex items-center space-x-2'>
                            <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor()}`}></span>
                            <span className='font-semibold text-gray-700'>
                                {disasterData.status || 'Resolved'}
                            </span>
                        </div>
                    </div>

                    {/* Disaster Type and Location */}
                    <div className='flex items-center space-x-3 bg-blue-50 p-2 rounded-lg'>
                        <MapPin className='text-indigo-600' size={24} />
                        <span className='font-semibold text-gray-800'>
                            {disasterData.disasterType} in {disasterData.location}
                        </span>
                    </div>

                    {/* Timestamp */}
                    <div className='flex items-center space-x-3 bg-blue-50 p-2 rounded-lg'>
                        <Clock className='text-indigo-600' size={24} />
                        <span className='text-gray-600 text-sm'>
                            {formatDate(disasterData.timestamp)}
                        </span>
                    </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className='absolute bottom-2 right-2 w-8 h-1 bg-indigo-500 group-hover:w-12 transition-all duration-300 rounded-full'></div>
            </div>
        </div>
    );
}

export default DisasterCard;