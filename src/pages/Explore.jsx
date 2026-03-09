import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map as MapIcon, List, SlidersHorizontal, ChevronLeft, MapPin, X } from 'lucide-react';
import Map from '../components/explore/Map';
import FilterPanel from '../components/explore/FilterPanel';
import CompareBar from '../components/explore/CompareBar';
import CompareModal from '../components/explore/CompareModal';
import ListingCard from '../components/common/ListingCard';
import Button from '../components/common/Button';
import placesData from '../data/places.json';

const Explore = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [viewMode, setViewMode] = useState('split'); // 'split', 'map', 'list'
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        categories: [],
        minRating: 0,
        priceRange: null,
        openNow: false
    });
    const [activePlaceId, setActivePlaceId] = useState(null);

    const filteredPlaces = useMemo(() => {
        return placesData.filter(place => {
            const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                place.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeFilters.categories.length === 0 || activeFilters.categories.includes(place.category);
            const matchesRating = place.rating >= activeFilters.minRating;
            const matchesPrice = !activeFilters.priceRange || place.priceRange === activeFilters.priceRange;

            return matchesSearch && matchesCategory && matchesRating && matchesPrice;
        });
    }, [searchQuery, activeFilters]);

    // Update URL when search query changes
    useEffect(() => {
        const currentQ = searchParams.get('q') || '';
        if (searchQuery !== currentQ) {
            const newParams = new URLSearchParams(searchParams);
            if (searchQuery) {
                newParams.set('q', searchQuery);
            } else {
                newParams.delete('q');
            }
            setSearchParams(newParams, { replace: true });
        }
    }, [searchQuery, setSearchParams, searchParams]);

    const handleFilterChange = (type, value) => {
        if (type === 'reset') {
            setActiveFilters({
                categories: [],
                minRating: 0,
                priceRange: null,
                openNow: false
            });
            return;
        }

        setActiveFilters(prev => {
            if (type === 'categories') {
                const newCats = prev.categories.includes(value)
                    ? prev.categories.filter(c => c !== value)
                    : [...prev.categories, value];
                return { ...prev, categories: newCats };
            }
            return { ...prev, [type]: value };
        });
    };

    return (
        <div className="flex flex-col h-screen bg-cream-50 overflow-hidden pt-20">
            {/* Command Interface - Institutional Inventory Header */}
            <header className="flex-none bg-white border-b border-forest-950/5 px-6 md:px-12 py-8 z-50">
                <div className="max-w-[1900px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16">
                    <div className="flex items-center space-x-12 shrink-0">
                        <div className="space-y-3">
                            <span className="caption-elite text-gold-700">Legacy Landscapes Archive</span>
                            <h1 className="text-2xl md:text-3xl font-serif font-bold text-forest-950 italic leading-tight">The Nilambur <br /><span className="italic-accent text-forest-300">Collective Record</span></h1>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row items-center gap-6 lg:gap-10">
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-forest-200 group-focus-within:text-gold-500 transition-premium" size={14} />
                            <input
                                type="text"
                                placeholder="Discover the narrative..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-12 py-4 bg-forest-100/50 border border-forest-950/15 rounded-md text-[11px] font-bold uppercase tracking-[0.12em] text-forest-950 focus:bg-white focus:border-gold-500/40 focus:shadow-soft transition-premium placeholder:text-forest-400/60 placeholder:italic placeholder:font-serif placeholder:normal-case placeholder:tracking-normal"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-forest-200 hover:text-forest-950 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        <div className="h-12 w-px bg-forest-950/5 hidden lg:block" />

                        <div className="hidden lg:flex items-center bg-forest-50/50 p-1.5 rounded-md border border-forest-950/5">
                            {[
                                { id: 'split', icon: MapIcon, label: 'Bimodal' },
                                { id: 'list', icon: List, label: 'Taxonomy' }
                            ].map(mode => (
                                <button
                                    key={mode.id}
                                    onClick={() => setViewMode(mode.id)}
                                    className={`flex items-center space-x-3 px-6 py-2.5 rounded-md transition-premium text-[9px] font-bold uppercase tracking-[0.2em] ${viewMode === mode.id ? 'bg-forest-950 text-white shadow-soft' : 'text-forest-300 hover:text-forest-950'}`}
                                >
                                    <mode.icon size={11} strokeWidth={1.5} />
                                    <span>{mode.label}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center space-x-4 px-8 py-4 bg-forest-950 text-white rounded-md shadow-premium hover:bg-gold-500 hover:text-forest-950 transition-all duration-700 text-[9px] font-black uppercase tracking-[0.4em] group border border-white/5"
                        >
                            <SlidersHorizontal size={14} className="group-hover:rotate-180 transition-transform duration-1000" />
                            <span>Refine the Search</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 relative flex overflow-hidden">
                {/* Listings Section - The Curated Stream */}
                <div className={`flex-1 overflow-y-auto custom-scrollbar bg-cream-50 transition-premium relative ${viewMode === 'list' ? 'w-full' : 'w-full lg:w-[460px] xl:w-[500px] border-r border-forest-950/5'}`}>
                    {/* Archival Grid Overlay - Exploration Scale */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.01] bg-[linear-gradient(90deg,rgba(18,38,32,0.1)_1px,transparent_1px),linear-gradient(rgba(18,38,32,0.1)_1px,transparent_1px)] bg-[size:60px_60px] z-0" />

                    <div className="p-6 md:p-10 pb-64 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-sm animate-pulse" />
                                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-forest-950 italic shrink-0 flex items-center gap-4">
                                        <span>{filteredPlaces.length} Curated Sites</span>
                                        <span className="text-forest-200/40 text-[8px] font-black animate-archival-flicker">| DOCUMENTING LAYER [0..1]</span>
                                    </h2>
                                </div>
                                <div className="hidden md:block h-3 w-px bg-forest-950/10" />
                                <div className="flex flex-wrap gap-2">
                                    {activeFilters.categories.map(cat => (
                                        <div key={cat} className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border border-forest-950/5 shadow-soft transition-premium hover:border-gold-400/20">
                                            <span className="text-[9px] font-bold uppercase tracking-tight text-forest-500">{cat}</span>
                                            <button onClick={() => handleFilterChange('categories', cat)} className="text-forest-200 hover:text-forest-950">
                                                <X size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {(activeFilters.categories.length > 0 || activeFilters.minRating > 0 || activeFilters.priceRange || activeFilters.openNow) && (
                                <button
                                    onClick={() => handleFilterChange('reset')}
                                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600 hover:text-forest-950 transition-premium flex items-center gap-2 group"
                                >
                                    <span className="w-4 h-px bg-gold-500 group-hover:w-6 transition-premium" />
                                    Clear Parameters
                                </button>
                            )}
                        </div>

                        {filteredPlaces.length > 0 ? (
                            <div className={`grid gap-10 ${viewMode === 'list' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                                {filteredPlaces.map((place, index) => (
                                    <motion.div
                                        key={place.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.6 }}
                                        onMouseEnter={() => setActivePlaceId(place.id)}
                                    >
                                        <ListingCard place={place} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-48 bg-white/30 rounded-md border border-forest-950/5 border-dashed relative overflow-hidden group/null">
                                {/* System Ghost Lines */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(90deg,transparent_95%,rgba(18,38,32,0.1)_95%),linear-gradient(transparent_95%,rgba(18,38,32,0.1)_95%)] bg-[length:40px_40px]" />

                                <motion.div
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                        scale: [0.98, 1, 0.98]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Search size={40} className="text-forest-100 mx-auto mb-10" strokeWidth={0.5} />
                                </motion.div>

                                <h3 className="text-3xl font-serif font-bold text-forest-950 mb-4 italic tracking-tighter uppercase">Null Sector <span className="text-gold-500/30">Found</span></h3>
                                <p className="text-[11px] text-forest-400 max-w-xs mx-auto leading-relaxed font-bold uppercase tracking-[0.2em] mb-10 opacity-60">The intelligence grid cannot locate matching assets for these parameters.</p>

                                <Button
                                    variant="ghost"
                                    onClick={() => handleFilterChange('reset')}
                                    className="border-forest-950/10 hover:border-gold-500/40 text-forest-300 hover:text-forest-950"
                                >
                                    Reset Documentation
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Section */}
                <div className={`hidden lg:block transition-all duration-700 ${viewMode === 'list' ? 'w-0' : 'flex-1'}`}>
                    <Map
                        places={filteredPlaces}
                        activePlaceId={activePlaceId}
                        onMarkerClick={setActivePlaceId}
                    />
                </div>

                {/* Mobile View Toggle */}
                <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <button
                        onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                        className="bg-forest-950 text-gold-500 px-8 py-4 rounded-full shadow-medium flex items-center space-x-3 border border-white/10 hover:scale-105 transition-premium active:scale-95"
                    >
                        {viewMode === 'map' ? (
                            <>
                                <List size={18} />
                                <span className="text-[9px] font-bold uppercase tracking-[0.15em]">List View</span>
                            </>
                        ) : (
                            <>
                                <MapIcon size={18} />
                                <span className="text-[9px] font-bold uppercase tracking-[0.15em]">Map View</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Full-screen Mobile Map Overlay */}
                <AnimatePresence>
                    {viewMode === 'map' && (
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            className="lg:hidden fixed inset-0 z-40 bg-white"
                        >
                            <div className="absolute top-8 left-8 z-50">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className="p-3 bg-white rounded-md shadow-soft border border-forest-900/5 text-forest-900 hover:text-gold-600 transition-premium"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            </div>
                            <Map
                                places={filteredPlaces}
                                activePlaceId={activePlaceId}
                                onMarkerClick={setActivePlaceId}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Filter Sidebar Overlay */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsFilterOpen(false)}
                                className="fixed inset-0 bg-forest-950/40 backdrop-blur-md z-[60]"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 h-full w-full sm:w-[500px] z-[70] p-6 lg:p-12 overflow-y-auto"
                            >
                                <FilterPanel
                                    filters={activeFilters}
                                    setFilters={setActiveFilters}
                                    onClose={() => setIsFilterOpen(false)}
                                    stats={filteredPlaces.length}
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <CompareBar onOpenCompare={() => setIsCompareModalOpen(true)} />
                <CompareModal
                    isOpen={isCompareModalOpen}
                    onClose={() => setIsCompareModalOpen(false)}
                />
            </main>
        </div>
    );
};

export default Explore;
