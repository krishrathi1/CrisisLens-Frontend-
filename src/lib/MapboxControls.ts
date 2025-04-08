export class RecenterControl {
    private _center: number[];
    private _zoom: number;
    private _map: any;

    constructor(options = {
        center: [78.9629, 20.5937],
        zoom: 4
    }) {
        this._center = options.center || [78.9629, 20.5937];
        this._zoom = options.zoom || 4;
    }

    onAdd(map: any) {
        this._map = map;

        // Create the container for the control
        const container = document.createElement('div');
        container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

        // Create the button
        const button = document.createElement('button');
        button.className = 'mapboxgl-ctrl-button';
        button.textContent = 'Recenter';
        button.innerHTML = '<i style="color: black; display: flex; justify-content: center; align-items: center;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-locate-fixed"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></svg></i>';

        // Add click event to the button
        button.addEventListener('click', () => {
            this._map.flyTo({
                center: this._center,
                zoom: this._zoom,
                essential: true,
                speed: 3
            });
        });

        // Append the button to the container
        container.appendChild(button);

        return container;
    }

    onRemove() {
        this._map = null;
    }
}