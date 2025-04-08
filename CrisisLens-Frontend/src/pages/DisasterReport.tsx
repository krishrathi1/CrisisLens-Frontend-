import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisasterHeader from "../components/DisasterHeader";
import Description from "../components/Description";
import { Disaster } from "@/types/disaster";

const DisasterReport = () => {
    const { slug } = useParams(); // Extracting disaster ID from URL params
    const [disaster, setDisaster] = useState<Disaster | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        
        // Fetch disaster details from MongoDB API
        fetch(`http://localhost:5000/api/disasters/${slug}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch disaster data");
                }
                return res.json();
            })
            .then((data) => {
                setDisaster(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching disaster data:", err);
                setError("Failed to load disaster details.");
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <div className="text-center text-blue-500">Loading disaster details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!disaster) {
        return <div className="text-center text-gray-500">No disaster found.</div>;
    }

    return (
        <div className="w-full max-w-[80vw] mx-auto h-screen">
            <div className="w-full h-full flex flex-col justify-evenly">
                {/* Disaster Header */}
                <DisasterHeader disasterData={disaster} />
                {/* Disaster Description */}
                <Description disasterData={disaster} />
            </div>
        </div>
    );
};

export default DisasterReport;
