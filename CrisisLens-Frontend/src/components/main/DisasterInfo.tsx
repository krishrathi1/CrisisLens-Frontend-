import React from 'react';
import { useDisasterStore } from '../../zustand/useDisasterStore';
import { ArrowLeft, FileText, MapPin, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const DisasterInfo = () => {
    const disaster = useDisasterStore((state) => state.selectedDisaster);
    const setSection = useDisasterStore((state) => state.setSection);

    if (!disaster) return <p className="text-center mt-10">No disaster selected.</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                    <button
                        className="flex items-center gap-2 mb-4 text-white/80 hover:text-white transition-all duration-300"
                        onClick={() => setSection("disasters")}
                    >
                        <ArrowLeft size={24} />
                        Back to Disasters
                    </button>
                    <h1 className="text-3xl font-extrabold tracking-tight">{disaster.title}</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-6 p-6">
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="text-blue-600" />
                                <h2 className="text-xl font-bold text-gray-800">Disaster Description</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {disaster.description || 'No description available.'}
                            </p>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin className="text-blue-600" />
                                <h2 className="text-xl font-bold text-gray-800">Affected Area</h2>
                            </div>
                            <p className="text-gray-600">{disaster.location}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock className="text-blue-600" />
                                <h2 className="text-xl font-bold text-gray-800">Status</h2>
                            </div>
                            <div className="flex items-center">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                    {disaster.status || 'Unknown'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <FileText className="text-blue-600" />
                                <h2 className="text-xl font-bold text-gray-800">Detailed Report</h2>
                            </div>
                            <Link
                                to={`/disaster/${disaster._id}`}
                                className="w-full block text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-md hover:scale-105 transition-all duration-300"
                            >
                                View Full Report
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisasterInfo;
