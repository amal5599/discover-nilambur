import React from 'react';
import { Filter, Star, Clock, X, MapPin, Utensils, Coffee, Building, Palmtree, Home, Waves, Trees, Mountain, ShoppingBag, Fuel, Hospital, Banknote, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import categories from '../../data/categories.json';

const iconMap = {
    restaurants: Utensils,
    cafes: Coffee,
    hotels: Building,
    resorts: Palmtree,
    homestays: Home,
    waterfalls: Waves,
    parks: Trees,
    viewpoints: Mountain,
    shopping: ShoppingBag,
    fuel: Fuel,
    hospitals: Hospital,
    banks: Banknote,
    emergency: AlertTriangle
};

const FilterPanel = ({ filters, setFilters, onClose, stats }) => {
    const onFilterChange = (key, value) => {
        if (key === 'reset') {
            setFilters({
                search: '',
                categories: [],
                minRating: 0,
                priceRange: '',
                openNow: false
            });
            return;
        }

        if (key === 'categories') {
            const updated = filters.categories.includes(value)
                ? filters.categories.filter(c => c !== value)
                : [...filters.categories, value];
            setFilters({ ...filters, [key]: updated });
        } else {
            setFilters({ ...filters, [key]: value });
        }
    };

    return (
        <div className="bg-white rounded-md shadow-premium border border-forest-950/5 flex flex-col h-full overflow-hidden relative">
            <header className="flex-none p-6 md:p-8 border-b border-forest-950/5 bg-white/80 backdrop-blur-md z-10">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <span className="caption-elite text-gold-700">Inquiry Interface</span>
                        <h3 className="section-title text-forest-950 leading-none italic">Refining Discovery <br /><span className="italic-accent text-forest-300">Parameters</span></h3>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-forest-50 rounded-md transition-premium text-forest-200 hover:text-forest-950 group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-700" />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-forest-950/5 relative overflow-hidden">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-sm animate-pulse z-10" />
                    <span className="caption-elite text-forest-600 !tracking-widest uppercase font-black">{stats} Assets within Strategic Sector</span>
                    {/* Data Stream Pulse */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"
                    />
                </div>
            </header>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12 py-10">
                <div className="space-y-8">
                    <div className="flex items-center gap-6">
                        <span className="caption-elite text-forest-500 font-black">Taxonomy Protocol</span>
                        <div className="h-px w-full bg-forest-950/10" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categories.map((cat, idx) => {
                            const Icon = iconMap[cat.id] || MapPin;
                            const isActive = filters.categories.includes(cat.slug);
                            return (
                                <motion.label
                                    key={cat.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.02 }}
                                    className={`group relative flex items-center p-4 rounded-md border cursor-pointer transition-premium ${isActive ? 'bg-forest-950 border-forest-950 shadow-soft' : 'bg-white border-forest-950/5 hover:border-gold-400/20'}`}
                                >
                                    <div className="flex items-center space-x-4 w-full">
                                        <div className={`transition-colors duration-500 ${isActive ? 'text-gold-500' : 'text-forest-400 group-hover:text-gold-600'}`}>
                                            <Icon size={14} strokeWidth={2} />
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-[0.1em] transition-colors duration-500 ${isActive ? 'text-white' : 'text-forest-500 group-hover:text-forest-950'}`}>
                                            {cat.name}
                                        </span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={() => onFilterChange('categories', cat.slug)}
                                        className="hidden"
                                    />
                                    {isActive && (
                                        <div className="absolute right-4 w-1 h-1 bg-gold-400 rounded-full shadow-premium" />
                                    )}
                                </motion.label>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <span className="caption-elite text-forest-500 font-black">Sanctity Threshold</span>
                            <div className="h-px w-full bg-forest-950/10" />
                        </div>
                        <div className="flex items-center gap-4">
                            {[3, 4, 4.5].map((rate) => (
                                <button
                                    key={rate}
                                    onClick={() => onFilterChange('minRating', rate)}
                                    className={`flex-1 py-4 border rounded-sm text-[10px] font-bold tracking-widest uppercase transition-premium ${filters.minRating === rate
                                        ? 'bg-forest-950 text-gold-500 border-forest-950 shadow-soft'
                                        : 'bg-white text-forest-300 border-forest-950/5 hover:border-gold-300 hover:text-forest-950'
                                        }`}
                                >
                                    {rate}+ <span className="text-gold-500 ml-1">★</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <span className="caption-elite text-forest-500 font-black">Economic Strata</span>
                            <div className="h-px w-full bg-forest-950/10" />
                        </div>
                        <div className="flex items-center gap-4">
                            {['$', '$$', '$$$'].map((price) => (
                                <button
                                    key={price}
                                    onClick={() => onFilterChange('priceRange', price)}
                                    className={`flex-1 py-4 rounded-sm text-[11px] font-bold transition-premium border tracking-[0.4em] ${filters.priceRange === price
                                        ? 'bg-forest-950 text-gold-500 border-forest-950 shadow-soft'
                                        : 'bg-white text-forest-400 border-forest-950/10 hover:border-gold-300 hover:text-forest-950'
                                        }`}
                                >
                                    {price}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <label className="flex items-center justify-between cursor-pointer group p-6 bg-forest-50/50 border border-forest-950/5 rounded-md transition-premium hover:bg-white hover:shadow-soft">
                        <div className="flex items-center space-x-6">
                            <div className={`p-3 rounded-md transition-premium ${filters.openNow ? 'bg-gold-500 text-forest-950' : 'bg-white border border-forest-950/10 text-forest-500'}`}>
                                <Clock size={14} strokeWidth={2} />
                            </div>
                            <div className="text-left space-y-1">
                                <span className="block font-serif font-bold text-lg text-forest-950 italic tracking-tight leading-none group-hover:text-gold-600 transition-premium">Real-time Status</span>
                                <span className="caption-elite text-forest-500 !tracking-widest font-black capitalize">Live availability interrogation</span>
                            </div>
                        </div>
                        <div className="relative inline-flex items-center">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={filters.openNow}
                                onChange={(e) => onFilterChange('openNow', e.target.checked)}
                            />
                            <div className="w-12 h-6 bg-forest-100 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-premium peer-checked:bg-forest-950"></div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex-none p-6 md:p-8 border-t border-forest-950/5 flex gap-4 bg-cream-50/30">
                <button
                    onClick={() => onFilterChange('reset')}
                    className="flex-1 py-4 bg-white border border-forest-950/5 text-forest-400 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-forest-950 hover:text-white transition-premium rounded-md"
                >
                    Reset
                </button>
                <button
                    onClick={onClose}
                    className="flex-[2] py-4 bg-forest-950 text-white text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold-500 hover:text-forest-950 transition-all duration-700 rounded-md shadow-premium group flex items-center justify-center gap-4 border border-white/5 active:scale-[0.98]"
                >
                    <span>Authorize Inquiry</span>
                    <ArrowRight size={14} strokeWidth={1} className="transition-transform group-hover:translate-x-2 duration-700" />
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;
