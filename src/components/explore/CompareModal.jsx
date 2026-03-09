import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, Star, MapPin, ExternalLink, Trash2 } from 'lucide-react';
import { useInteraction } from '../../hooks/useInteraction';
import places from '../../data/places.json';
import { Link } from 'react-router-dom';

const CompareModal = ({ isOpen, onClose }) => {
    const { compareList, toggleCompare, clearCompare } = useInteraction();
    const compareItems = compareList.map(id => places.find(p => p.id === id)).filter(Boolean);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-forest-950/40 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-[1400px] h-full max-h-[90vh] bg-white rounded-sm shadow-zenith overflow-hidden flex flex-col border border-forest-900/5"
                >
                    {/* Archival Overlays */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(90deg,rgba(18,38,32,0.1)_1px,transparent_1px),linear-gradient(rgba(18,38,32,0.1)_1px,transparent_1px)] bg-[size:60px_60px] z-0" />
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,38,32,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-0" />
                    {/* Header */}
                    <div className="flex-none p-10 border-b border-forest-900/5 flex items-center justify-between bg-forest-50/50">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-forest-950 text-gold-500 rounded-md">
                                <GitCompare size={24} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-forest-950 italic tracking-tight">Comparison <span className="text-forest-300">Atlas</span></h2>
                                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-forest-300 mt-2">Analytical Destination Overlay</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <button
                                onClick={clearCompare}
                                className="text-[10px] uppercase tracking-widest font-black text-forest-300 hover:text-forest-900 transition-colors flex items-center gap-3"
                            >
                                <Trash2 size={14} /> Clear Atlas
                            </button>
                            <button
                                onClick={onClose}
                                className="p-4 bg-white border border-forest-900/10 rounded-full text-forest-900 hover:text-gold-600 hover:border-gold-400 transition-premium shadow-soft group"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>

                    {/* Comparison Body */}
                    <div className="flex-1 overflow-x-auto p-12 custom-scrollbar">
                        <div className="min-w-[1000px] h-full grid grid-cols-4 gap-12">
                            {/* Static Labels */}
                            <div className="space-y-12 pr-12 border-r border-forest-900/5">
                                <div className="h-64 invisible" /> {/* Placeholder for image row */}
                                <div className="space-y-16">
                                    {[
                                        { label: "Designation Type", icon: Star },
                                        { label: "Spatial Location", icon: MapPin },
                                        { label: "Discovery Rating", icon: Star },
                                        { label: "Investment Tier", icon: Star },
                                        { label: "Best Discovery Period", icon: Star },
                                        { label: "Architectural Vibe", icon: Star }
                                    ].map((row, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-forest-300">
                                            <row.icon size={12} className="text-gold-600/50" />
                                            <span className="text-[10px] uppercase tracking-[0.3em] font-black">{row.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Place Columns */}
                            {compareItems.map((place) => (
                                <div key={place.id} className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                                    <div className="relative h-64 rounded-sm overflow-hidden shadow-soft border border-forest-900/5 group">
                                        <img src={place.images[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={place.name} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
                                        <div className="absolute bottom-6 left-6">
                                            <h3 className="text-xl font-serif font-bold text-white italic italic-shadow">{place.name}</h3>
                                        </div>
                                        <button
                                            onClick={() => toggleCompare(place.id)}
                                            className="absolute top-4 right-4 p-2 bg-black/40 text-white/60 hover:text-gold-400 backdrop-blur-md rounded transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>

                                    <div className="space-y-16">
                                        <p className="text-sm font-bold text-forest-950 uppercase tracking-widest">{place.category}</p>
                                        <p className="text-sm font-bold text-forest-400 italic font-serif">{place.location}</p>
                                        <div className="flex items-center gap-2">
                                            <Star size={14} className="text-gold-500" fill="currentColor" />
                                            <span className="text-sm font-bold text-forest-950 font-serif italic">{place.rating} / 5.0</span>
                                        </div>
                                        <p className="text-sm font-bold text-forest-950 tracking-[0.2em] italic">{place.priceRange}</p>
                                        <p className="text-sm font-bold text-forest-700 font-serif italic">{place.bestTime || 'Seasonal'}</p>
                                        <p className="text-sm text-forest-500 font-serif italic italic-shadow leading-relaxed">{place.description.substring(0, 100)}...</p>

                                        <Link
                                            to={`/place/${place.slug}`}
                                            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-black text-forest-950 hover:text-gold-600 transition-colors border-b-2 border-forest-950 pb-2"
                                        >
                                            Inquire Further <ExternalLink size={12} />
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {/* Add Empty State Slots */}
                            {Array.from({ length: 3 - compareItems.length }).map((_, idx) => (
                                <div key={`empty-${idx}`} className="border-2 border-dashed border-forest-100 rounded-sm flex flex-col items-center justify-center space-y-4 bg-forest-50/20 text-forest-200">
                                    <GitCompare size={32} strokeWidth={1} />
                                    <p className="text-[10px] uppercase font-black tracking-widest">Select more to compare</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CompareModal;
