import React from "react";
import { useParams } from "react-router-dom";
import DisasterHeader from "../components/DisasterHeader";
import Description from "../components/Description";
import LatestPosts from "../components/LatestPosts";
import { data } from "@/data/dummy"; // Assuming dummy data is in src/data/dummy.js
import { Disaster } from "@/types/disaster"; // TypeScript types (optional)

const DisasterReport = () => {
    const { slug } = useParams(); // Extracting slug from the URL
    const disaster: Disaster | undefined = data.find((disaster) => disaster._id === slug);

    if (!disaster) {
        return <div className="text-center text-red-500">Disaster not found!</div>;
    }

    return (
        <div className="w-full max-w-[80vw] mx-auto h-screen">
            <div className="w-full h-full flex flex-col justify-evenly">
                {/* Heading */}
                <DisasterHeader key={slug} disasterData={disaster} />
                <Description />
                {/* <LatestPosts /> */}
            </div>
        </div>
    );
};

export default DisasterReport;
