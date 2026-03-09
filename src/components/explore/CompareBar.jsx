import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, X, MoveRight } from 'lucide-react';
import { useInteraction } from '../../hooks/useInteraction';
import places from '../../data/places.json';

const CompareBar = ({ onOpenCompare }) => {
    const { compareList, toggleCompare, clearCompare } = useInteraction();
    const compareItems = compareList.map(id => places.find(p => p.id === id)).filter(Boolean);

    if (compareItems.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[80] w-[90%] max-w-4xl"
            >
                <div className="bg-forest-950 border border-white/10 rounded-sm shadow-zenith p-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-8">
                        <div className="flex -space-x-4">
                            {compareItems.map((item) => (
                                <div key={item.id} className="relative group">
                                    <div className="w-16 h-16 rounded-sm border-2 border-forest-900 overflow-hidden shadow-soft">
                                        <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
                                    </div>
                                    <button
                                        onClick={() => toggleCompare(item.id)}
                                        className="absolute -top-2 -right-2 bg-forest-900 hover:bg-gold-600 text-white p-1 rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X size={10} />
                                    </button>
                                </div>
                            ))}
                            {Array.from({ length: 3 - compareItems.length }).map((_, idx) => (
                                <div key={idx} className="w-16 h-16 rounded-sm border-2 border-dashed border-white/10 flex items-center justify-center text-white/20">
                                    <GitCompare size={16} />
                                </div>
                            ))}
                        </div>
                        <div className="hidden lg:block">
                            <h4 className="text-white font-serif font-bold italic tracking-wide">Comparison Atlas</h4>
                            <p className="text-[8px] uppercase tracking-[0.3em] text-gold-500 font-black mt-1">{compareItems.length} / 3 SELECTIONS READY</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={clearCompare}
                            className="text-[9px] uppercase tracking-widest font-black text-white/40 hover:text-white transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={onOpenCompare}
                            className="bg-gold-500 text-forest-950 px-8 py-4 rounded-md shadow-gold-500/20 shadow-premium flex items-center gap-4 text-[10px] uppercase font-black tracking-[0.2em] hover:bg-white hover:scale-105 transition-premium group"
                        >
                            Intersect Destinations <MoveRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CompareBar;
