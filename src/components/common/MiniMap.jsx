import React from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Navigation } from 'lucide-react';

// Leaflet CSS integration
import 'leaflet/dist/leaflet.css';

const MiniMap = ({ position, name }) => {
    // Custom SVG Marker Icon - Elite Standard
    const customIcon = L.divIcon({
        className: 'mini-custom-marker',
        html: `
            <div class="relative flex items-center justify-center">
                <div class="relative w-8 h-8 bg-forest-950 border-gold-500/30 rounded-md border-[1.5px] flex items-center justify-center shadow-soft">
                    <div class="w-1.5 h-1.5 bg-gold-400 rounded-sm"></div>
                </div>
                <div class="absolute -bottom-1 w-2 h-2 bg-forest-950 rotate-45 border-r-[1.5px] border-b-[1.5px] border-gold-500/30"></div>
            </div>
        `,
        iconSize: [32, 40],
        iconAnchor: [16, 40],
    });

    return (
        <div className="h-full w-full rounded-sm overflow-hidden shadow-premium border border-forest-950/5 group relative">
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
                zoomControl={false}
            >
                {/* Archival Grid Overlay - Mini Scale */}
                <div className="absolute inset-0 pointer-events-none z-[500] opacity-[0.02] bg-[linear-gradient(90deg,rgba(18,38,32,0.1)_1px,transparent_1px),linear-gradient(rgba(18,38,32,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Premium Light-Theme Map Tiles */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <Marker position={position} icon={customIcon} />

                <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-3">
                    <button
                        onClick={() => window.open(`https://www.google.com/maps?q=${position[0]},${position[1]}`, '_blank')}
                        className="bg-forest-950 text-gold-500 p-4 rounded-md shadow-premium border border-white/5 hover:bg-gold-500 hover:text-forest-950 transition-premium mb-2"
                    >
                        <Navigation size={18} strokeWidth={1.5} />
                    </button>
                    <ZoomControl position="bottomright" />
                </div>

                {/* Info Overlay */}
                <div className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-md px-6 py-4 rounded-md border border-forest-950/5 shadow-soft">
                    <p className="text-[11px] font-bold text-forest-950 mb-1 uppercase tracking-tight">{name}</p>
                    <p className="caption-elite text-forest-400 !tracking-widest">Coordinates: {position[0]}, {position[1]}</p>
                </div>

                {/* Decorative Elite Frame */}
                <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-sm z-[1001]" />
            </MapContainer>
        </div>
    );
};

export default MiniMap;
