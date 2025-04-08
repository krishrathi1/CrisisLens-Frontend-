import { useDisasterStore } from '@/zustand/useDisasterStore';
import React from 'react';
import { parseNewlines } from "@/lib/utils";
import { FileText, MapPin, AlertTriangle, Users, Calendar } from 'lucide-react';

const Description = () => {
    const disaster = useDisasterStore((state) => state.selectedDisaster);
    const parsedDisaster = parseNewlines(JSON.stringify(disaster));

    // Format date for display
    const formatDate = (timestamp: string): string => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleString('en-US', options);
    };

    return (
        <div className="px-4 py-6 max-w-8xl mx-auto">
            <div className="space-y-6">
                <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                        <FileText className="text-blue-600" size={22} />
                        <h2 className="text-xl font-bold text-gray-800">Disaster Description</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        {parsedDisaster.description || 'No description available.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                            <MapPin className="text-blue-600" size={22} />
                            <h2 className="text-xl font-bold text-gray-800">Affected Area</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{disaster.location || 'Location not specified'}</p>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                            <AlertTriangle className="text-blue-600" size={22} />
                            <h2 className="text-xl font-bold text-gray-800">Disaster Type</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{disaster.disasterType || 'Type not specified'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                            <Users className="text-blue-600" size={22} />
                            <h2 className="text-xl font-bold text-gray-800">Affected Population</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            {parsedDisaster.affectedPopulation ? `${parsedDisaster.affectedPopulation.toLocaleString()} people` : 'Data not available'}
                        </p>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                            <Calendar className="text-blue-600" size={22} />
                            <h2 className="text-xl font-bold text-gray-800">Occurrence Date</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            {formatDate(disaster.timestamp || disaster.createdAt || '')}
                        </p>
                    </div>
                </div>

                {parsedDisaster.additionalInfo && (
                    <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                            <FileText className="text-blue-600" size={22} />
                            <h2 className="text-xl font-bold text-gray-800">Additional Information</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            {parsedDisaster.additionalInfo}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Description;