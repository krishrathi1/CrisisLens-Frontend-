interface DisasterIconMapping {
    [disasterName: string]: string;
}

const disasterIconMapping: DisasterIconMapping = {
    blizzard: "/disaster/blizzard.png",
    drought: "/disaster/drought.png",
    earthquake: "/disaster/earthquake.png",
    flood: "/disaster/flood.png",
    hurricane: "/disaster/hurricane.png",
    landslide: "/disaster/landslide.png",
    radioactive: "/disaster/radioactive.png",
    industrial_disaster: "/disaster/industrial_disaster.png",
    glacier_burst: "/disaster/glacier_burst.png",
    dam_failure: "/disaster/dam_failure.png",
    tornado: "/disaster/tornado.png",
    cyclone: "/disaster/cyclone.png",
    tsunami: "/disaster/tsunami.png",
    volcano: "/disaster/volcano.png",
    wildfire: "/disaster/wildfire.png",
    disease_outbreak: "/disaster/disease_outbreak.png",
    pandemic: "/disaster/pandemic.png",
    train_accident: "/disaster/train_accident.png",
};

export const getDisasterIcon = (disasterName: string): string => {
    return disasterIconMapping[disasterName];
};
