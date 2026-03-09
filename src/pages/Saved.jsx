import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MoveRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInteraction } from '../hooks/useInteraction';
import places from '../data/places.json';
import ListingCard from '../components/common/ListingCard';
import CompareBar from '../components/explore/CompareBar';
import CompareModal from '../components/explore/CompareModal';

const Saved = () => {
    const { wishlist } = useInteraction();
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const savedPlaces = wishlist.map(id => places.find(p => p.id === id)).filter(Boolean);

    return (
        <div className="bg-cream-50 min-h-screen pt-32 pb-24">
            <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                <header className="mb-24 space-y-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <div className="h-px w-20 bg-gold-400/30" />
                            <span className="hero-subtitle-refined">Personal Collection of Stories</span>
                        </div>
                        <div className="hidden lg:block">
                            <div className="space-y-1 opacity-40 text-right">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest-950">User Collection</span>
                                <p className="text-[8px] font-mono text-gold-600 tracking-[0.2em]">IDENTIFIED DESTINATION CLUSTER</p>
                            </div>
                        </div>
                    </div>

                    <h1 className="hero-title italic text-forest-950 leading-none">
                        Personal <span className="text-forest-200">Destination Collection</span>
                    </h1>
                    <p className="text-forest-700 text-2xl font-serif italic max-w-3xl italic-shadow leading-relaxed">
                        "Your selected destinations and preserved sites, meticulously curated for future discovery."
                    </p>
                </header>

                {savedPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {savedPlaces.map((place) => (
                            <ListingCard key={place.id} place={place} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 flex flex-col items-center justify-center text-center space-y-16 bg-white rounded-sm border border-forest-950/5 shadow-premium max-w-5xl mx-auto px-12 relative overflow-hidden">
                        {/* Archival Grid Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(90deg,rgba(18,38,32,0.1)_1px,transparent_1px),linear-gradient(rgba(18,38,32,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold-500/30" />

                        <div className="p-16 bg-forest-100/20 rounded-sm shadow-inner text-forest-300 group relative z-10">
                            <Heart size={64} strokeWidth={1} className="relative z-10 transition-transform duration-1000 animate-pulse text-gold-500" />
                            <div className="absolute inset-0 bg-gold-400/20 scale-0 group-hover:scale-150 rounded-full blur-3xl transition-transform duration-1000 will-change-transform" />
                        </div>

                        <div className="space-y-8">
                            <h3 className="section-title italic text-forest-950">Collection <span className="text-forest-200">Empty</span></h3>
                            <p className="body-elite text-[18px] md:text-[20px] text-forest-700 font-serif italic max-w-lg mx-auto leading-relaxed italic-shadow">
                                "Begin your discovery across the collective archive and index destinations that resonate with your spirit."
                            </p>
                        </div>

                        <Link to="/explore" className="bg-forest-950 hover:bg-gold-600 text-white hover:text-forest-950 py-6 px-12 text-[11px] font-black uppercase tracking-[0.6em] transition-all duration-1000 flex items-center justify-center space-x-6 rounded-sm shadow-premium hover-lift inline-flex">
                            <span>Discover the Collective Record</span>
                            <MoveRight size={14} strokeWidth={1} />
                        </Link>
                    </div>
                )}
            </div>

            <CompareBar onOpenCompare={() => setIsCompareModalOpen(true)} />
            <CompareModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
            />
        </div>
    );
};

export default Saved;
