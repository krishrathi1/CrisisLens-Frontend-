"use client"
import React, {useRef, useEffect, useState} from 'react';
import mapboxgl, {LngLat, LngLatBounds, Map} from 'mapbox-gl';
import {disasterPoints, stateColors} from "../../data/mapboxdummy";
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css';
import {data} from "../../data/dummy";
import {useDisasterStore} from "../../zustand/useDisasterStore";
import {RecenterControl} from "../../lib/MapboxControls";
import {Loader} from "../../components/Loader";
import {BounceLoader, ClipLoader, GridLoader, PuffLoader} from "react-spinners";


mapboxgl.accessToken = 'pk.eyJ1IjoibXJmbHluIiwiYSI6ImNsd3YzOWswMDBhc3YyaXNheGc3aTRtdTcifQ.vqe0vVgE90a8B2CH9lYjUg';


const MainMap = () => {
    const disaster = useDisasterStore((state) => state.selectedDisaster);
    const section = useDisasterStore((state) => state.section);
    const [mapLoadingState, setMapLoadingState] = useState(true);
    const setSection = useDisasterStore((state) => state.setSection);
    const setSelectedDisaster = useDisasterStore((state) => state.setSelectedDisaster);
    const mapContainer = useRef<any>(null);
    const currentPopUp = useRef<any>(null);
    const map = useRef<any>(null);
    const [lng, _setLng] = useState(78.9629);
    const [lat, _setLat] = useState(20.5937);
    const [zoom, _setZoom] = useState(4);


    useEffect(() => {
        // (async () => {
        //     let modifiedData = [];
        //     for (const item of data) {
        //         try {
        //             const coords = await getCoordinates(item.location);
        //             console.log(`${item.title}:`, coords);
        //             modifiedData.push({...item, coordinates: coords})
        //         } catch (error) {
        //             console.error(`Error fetching coordinates for ${item.location}:`, error);
        //         }
        //     }
        //     console.log(modifiedData);
        // })();
        if (map.current) return; // initialize map only once
        const bounds: [number, number, number, number] = [
            50, -10,   // Southwest coordinates [lng, lat] - extended far south and west
            110, 40    // Northeast coordinates [lng, lat] - extended far north and east
        ];
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [lng, lat],
            projection: 'mercator', // 'mercator' or 'geographic1
            zoom: zoom,
            maxBounds: bounds,
            minZoom: 4
        });

        map.current.addControl(new mapboxgl.NavigationControl({
            showCompass: false
        }));
        map.current.addControl(new RecenterControl({
            center: [78.9629, 20.5937], // Default center [lng, lat]
            zoom: 4 // Default zoom level
        }));
        map.current.on('load', () => {


            // Fit the map to the bounding box

            map.current.dragRotate.disable();
            map.current.touchZoomRotate.disableRotation();

            // Ensure map bearing remains fixed
            map.current.on('rotate', () => {
                map.current.rotateTo(0, {duration: 0}); // Reset to 0 degrees
            });

            // Optional: Lock bearing on load
            map.current.rotateTo(0, {duration: 0});
            // Add state boundaries source
            map.current.addSource('state-boundaries', {
                'type': 'geojson',
                'data': 'india_telengana.json' // Replace with the path to your GeoJSON file
            });
            const layerId = 'state-label';

            // Check if the layer exists
            if (map.current.getLayer(layerId)) {
                // Update the layer's paint properties to change the label style
                map.current.setPaintProperty(layerId, 'text-color', 'black'); // Change text color to red
                map.current.setPaintProperty(layerId, 'text-opacity', 1); // Change text color to red
            } else {
                console.error(`Layer ${layerId} not found`);
            }
            // Add state boundaries layer
            map.current.addLayer({
                'id': 'state-fill',
                'type': 'fill',
                'source': 'state-boundaries',
                'paint': {
                    'fill-color': [
                        'match',
                        ['get', 'NAME_1'], // Property name from GeoJSON that identifies the state
                        ...Object.entries(stateColors).flat(), // Flatten the stateColors object into an array of [stateName, color]
                        '#ffffff' // Default color if the state name does not match
                    ],
                    'fill-opacity': 0.3 // Faded effect
                }
            });

            // Add state boundaries layer
            map.current.addLayer({
                'id': 'state-boundaries-layer',
                'type': 'line',
                'source': 'state-boundaries',
                'layout': {},
                'paint': {
                    'line-color': '#686666', // Color of the state boundaries
                    'line-width': 1 // Width of the state boundaries
                }
            });

            map.current.addSource('disasters', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: data.map(point => ({
                        type: 'Feature',
                        data: 'help',
                        properties: {
                            data: point,
                            description: `
                                <div class="popup-content">
                                    <h3>${point.title}</h3>
                                    <p><strong>Time:</strong> ${new Date(point.timestamp).toLocaleDateString()}</p>
                                    <p><strong>Type:</strong> ${point.disasterType.replace('_', ' ')}</p>
                                    <p><strong>Status:</strong> Ongoing</p>
                                </div>
                            `,
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [point.coordinates.lng, point.coordinates.lat]
                        }
                    }))
                }
            });
            map.current.loadImage('location.png', (error: any, image: any) => {
                if (error) throw error;
                map.current.addImage('custom-icon', image);

                map.current.addLayer({
                    id: 'places',
                    type: 'symbol',
                    source: 'disasters',
                    layout: {
                        'icon-image': 'custom-icon',
                        'icon-size': 0.5,
                        'icon-allow-overlap': true,
                        'icon-ignore-placement': true
                    }
                });
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });

                // Event listener for showing popup on hover
                map.current.on('click', 'places', (e: any) => {
                    // console.log(e.features);
                    setSelectedDisaster(JSON.parse(e.features[0].properties.data));
                    setSection('disasterinfo');
                });
                map.current.on('mouseenter', 'places', (e: any) => {

                    // Change the cursor style as a UI indicator.
                    map.current.getCanvas().style.cursor = 'pointer';

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const description = e.features[0].properties.description;

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }


                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
                });

                // Event listener for hiding popup on hover out
                map.current.on('mouseleave', 'places', () => {
                    map.current.getCanvas().style.cursor = '';
                    popup.remove();
                });

            });
        });
        setTimeout(() => {
            setMapLoadingState(false);
        }, 1000);
    });


    useEffect(() => {
        if (!map.current) return;
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        if (section === 'disasters') {
            (map.current as Map).flyTo({
                center: [78.9629, 20.5937],
                zoom: 4,
                essential: true,
                speed: 3
            });
            if (currentPopUp.current)
                currentPopUp.current.remove();
            return;

        }
        console.log("TEST", disaster);
        if (!disaster.coordinates) return;
        if (!disaster.coordinates.lng || !disaster.coordinates.lat) return;
        if (currentPopUp.current)
            currentPopUp.current.remove();
        (map.current as Map).flyTo({
            center: [disaster.coordinates.lng, disaster.coordinates.lat],
            zoom: 7,
            essential: true,
            speed: 2
        });

        // Copy coordinates array.
        const description = `<div class="popup-content">
                                    <h3>${disaster.title}</h3>
                                    <p><strong>Time:</strong> ${new Date(disaster.timestamp).toLocaleDateString()}</p>
                                    <p><strong>Type:</strong> ${disaster.disasterType.replace('_', ' ')}</p>
                                    <p><strong>Status:</strong> Ongoing</p>
                                </div>
                            `;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        popup.setLngLat([disaster.coordinates.lng, disaster.coordinates.lat]).setHTML(description).addTo(map.current);
        currentPopUp.current = popup;
    }, [disaster, section]);
    return (
        <div className="w-full h-full relative">
            <div className={`w-full h-full bg-gray-100 absolute z-20 ${mapLoadingState?'':'hidden'} flex flex-col justify-center gap-6 items-center`}>
                <GridLoader
                    color={"#2e8bfd"}
                    loading={mapLoadingState}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <div className={"text-2xl text-blue-400"}>Loading Map</div>
            </div>
            <div ref={mapContainer} className="map-container w-full h-full absolute z-10"/>
        </div>


    )
}

export default MainMap;