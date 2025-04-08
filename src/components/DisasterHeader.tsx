import React from 'react';
import { Disaster } from '@/types/disaster';
import { getDisasterIcon } from '@/utils/disastericonmapping';
import { useDisasterStore } from '@/zustand/useDisasterStore';
import { AlertTriangle, MapPin, Clock, Calendar, Info } from 'lucide-react';

interface DisasterHeaderProps {
    disasterData: Disaster;
}

export function DisasterHeader({ disasterData }: DisasterHeaderProps) {
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
            default: return 'bg-red-500'; // Default to ongoing/red
        }
    };

    return (
        <div className='w-full mt-8 bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-100 relative'>
            {/* Gradient Background Overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 rounded-2xl pointer-events-none'></div>
            
            <div className='relative z-10'>
                {/* Top section with icon and title */}
                <div className='flex items-start gap-6 mb-6'>
                    <div className='bg-white p-4 rounded-full shadow-md flex-shrink-0'>
                        <img 
                            className='w-16 h-16 object-contain' 
                            src={getDisasterIcon(disasterData.disasterType.toLowerCase())} 
                            alt={disasterData.disasterType} 
                        />
                    </div>
                    
                    <div className='flex-1'>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                            {disasterData.title}
                        </h1>
                        
                        <div className='flex items-center space-x-2 bg-blue-50 p-2 rounded-lg'>
                            <AlertTriangle className='text-indigo-600' size={20} />
                            <div className='flex items-center gap-2'>
                                <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor()}`}></span>
                                <span className='font-semibold text-gray-700'>
                                    {disasterData.status || 'Resolved'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Details section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                    <div className='flex items-center space-x-3 bg-blue-50 p-3 rounded-lg'>
                        <Info className='text-indigo-600' size={24} />
                        <div>
                            <div className='text-sm text-gray-500'>Disaster Type</div>
                            <div className='font-semibold text-gray-800'>{disasterData.disasterType}</div>
                        </div>
                    </div>
                    
                    <div className='flex items-center space-x-3 bg-blue-50 p-3 rounded-lg'>
                        <MapPin className='text-indigo-600' size={24} />
                        <div>
                            <div className='text-sm text-gray-500'>Affected Area</div>
                            <div className='font-semibold text-gray-800'>{disasterData.location}</div>
                        </div>
                    </div>
                    
                    <div className='flex items-center space-x-3 bg-blue-50 p-3 rounded-lg'>
                        <Clock className='text-indigo-600' size={24} />
                        <div>
                            <div className='text-sm text-gray-500'>Last Updated</div>
                            <div className='font-semibold text-gray-800'>
                                {formatDate(disasterData.updatedAt || disasterData.timestamp || '')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DisasterHeader;