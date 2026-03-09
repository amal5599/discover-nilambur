import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight, Star, Navigation, MapPin } from 'lucide-react';

// Elite Custom Marker Icon - Engineered Precision
const createCustomIcon = (isActive) => L.divIcon({
    className: 'custom-marker',
    html: `
        <div class="relative flex items-center justify-center">
            ${isActive ? `
                <div class="absolute inset-0 w-12 h-12 bg-gold-400/20 rounded-full animate-ping pointer-events-none"></div>
                <div class="absolute inset-0 w-12 h-12 border border-gold-400/30 rounded-full animate-pulse-slow pointer-events-none"></div>
                <div class="absolute -inset-2 border-[0.5px] border-gold-500/40 rounded-sm pointer-events-none opacity-40"></div>
            ` : ''}
            <div class="relative w-8 h-8 ${isActive ? 'bg-forest-950 border-gold-500 shadow-premium' : 'bg-forest-950 border-gold-500/20 shadow-soft'} rounded-sm border-[1.5px] flex items-center justify-center transition-premium transform ${isActive ? 'scale-110' : 'hover:scale-110 hover:border-gold-500/60'}">
                <div class="absolute inset-[2px] border-[0.5px] border-white/5 pointer-events-none"></div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${isActive ? 'text-gold-500 animate-pulse' : 'text-forest-200'}">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
            </div>
            <div class="absolute -bottom-1.5 w-3 h-3 ${isActive ? 'bg-gold-500' : 'bg-forest-950'} rotate-45 border-r-[1.5px] border-b-[1.5px] ${isActive ? 'border-gold-500' : 'border-gold-500/20 shadow-soft'}"></div>
        </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48]
});

const MapRecenter = ({ center, zoom = 13 }) => {
    const map = useMap();
    useEffect(() => {
        if (map && center && Array.isArray(center) && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
            try {
                map.flyTo(center, zoom, {
                    duration: 2,
                    easeLinearity: 0.1
                });
            } catch (err) {
                console.error("Map transition error:", err);
            }
        }
    }, [center, zoom, map]);
    return null;
};

const Map = ({ places, activePlaceId, onMarkerClick }) => {
    const { center, zoom } = useMemo(() => {
        if (activePlaceId) {
            const activePlace = places.find(p => p.id === activePlaceId);
            if (activePlace && activePlace.coordinates && !isNaN(activePlace.coordinates[0]) && !isNaN(activePlace.coordinates[1])) {
                return { center: activePlace.coordinates, zoom: 15 };
            }
        }
        return { center: [11.2774, 76.2238], zoom: 13 };
    }, [activePlaceId, places]);

    return (
        <div className="h-full w-full relative group/map overflow-hidden">
            {/* Archival Grid Overlay - Premium Heritage Precision */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] bg-[linear-gradient(90deg,rgba(18,38,32,0.1)_1px,transparent_1px),linear-gradient(rgba(18,38,32,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.01] bg-[linear-gradient(rgba(18,38,32,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(18,38,32,0.2)_1px,transparent_1px)] bg-[size:200px_200px]" />

            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                className="h-full w-full z-10 !bg-forest-50"
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <ZoomControl position="bottomright" />
                <MapRecenter center={center} zoom={zoom} />

                {places.map((place) => (
                    <Marker
                        key={place.id}
                        position={place.coordinates}
                        icon={createCustomIcon(activePlaceId === place.id)}
                        eventHandlers={{
                            click: () => {
                                onMarkerClick(place.id);
                            },
                        }}
                    >
                        <Popup className="elite-popup" closeButton={false} maxWidth={340}>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-[320px] overflow-hidden rounded-md bg-white shadow-premium border border-forest-950/5 group/popup"
                            >
                                <div className="h-44 overflow-hidden relative">
                                    <img
                                        src={place.images[0]}
                                        alt={place.name}
                                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover/popup:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className="glass-premium px-3 py-1 rounded-sm text-[7px] font-bold tracking-[0.3em] text-forest-950 border border-white/40 uppercase">
                                            {place.category}
                                        </div>
                                        {place.featured && (
                                            <div className="bg-gold-500 px-3 py-1 rounded-sm text-[7px] font-bold tracking-[0.3em] text-forest-950 uppercase shadow-soft">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent opacity-80" />
                                    <div className="absolute bottom-4 left-6 right-6">
                                        <h4 className="font-serif font-bold text-white text-xl leading-tight mb-1 italic tracking-tight">
                                            {place.name}
                                        </h4>
                                        <div className="flex items-center gap-2 text-white/70">
                                            <MapPin size={10} className="text-gold-500" />
                                            <span className="text-[8px] font-bold uppercase tracking-[0.2em]">{place.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-10 space-y-8 relative overflow-hidden">
                                    {/* Scanline Effect in Popup */}
                                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,38,32,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />

                                    <p className="body-elite text-[13px] text-forest-500 italic line-clamp-2 leading-relaxed relative z-10">
                                        {place.shortDescription || place.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-8 border-t border-forest-950/5 relative z-10">
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col">
                                                <span className="caption-elite text-gold-600 !tracking-widest">Asset Rating</span>
                                                <div className="flex items-center gap-1">
                                                    <Star size={10} className="text-gold-500 fill-gold-500" />
                                                    <span className="text-[11px] font-bold text-forest-950">{place.rating}</span>
                                                </div>
                                            </div>
                                            <div className="w-px h-8 bg-forest-950/5" />
                                            <div className="flex flex-col">
                                                <span className="caption-elite text-gold-600 !tracking-widest">Strata Class</span>
                                                <span className="text-[11px] font-bold text-forest-950">{place.priceRange}</span>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/place/${place.slug}`}
                                            className="px-6 py-3 bg-forest-950 text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-md hover:bg-gold-600 hover:text-forest-950 transition-premium shadow-soft flex items-center gap-3 group/btn"
                                        >
                                            <span>Consult</span>
                                            <MoveRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

        </div>
    );
};

export default Map;
