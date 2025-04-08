import {create} from "zustand";
import {Disaster} from "../types/disaster";
import {data} from "../data/dummy";

interface DisasterStoreState {
    disasters: Disaster[];
    setDisasters: (disasters: Disaster[]) => void;
    section: "disasters" | "disasterinfo";
    setSection: (section: "disasters" | "disasterinfo") => void;
    selectedDisaster: Disaster;
    setSelectedDisaster: (selectedDisaster: Disaster) => void;
}

export const useDisasterStore = create<DisasterStoreState>((set) => ({
    disasters: data,
    setDisasters: (disasters) => set({disasters}),
    section: "disasters",
    setSection: (section) => set({section}),
    selectedDisaster: data[0],
    setSelectedDisaster: (selectedDisaster) => set({selectedDisaster}),
}));
