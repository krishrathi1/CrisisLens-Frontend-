export type Disaster = {
    _id: string;
    title: string;
    description: string;
    disasterType: string;
    imageURLS: string[];
    postAuthorURL: string;
    postLink: string;
    clusterIdentifier: string;
    timestamp: string;
    location: string;
    coordinates: {
        lat: number,
        lng: number
    }
};
