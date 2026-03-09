import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Utensils, Coffee, Building, Palmtree, Home,
    Waves, Trees, Mountain, ShoppingBag,
    Fuel, Hospital, Banknote, AlertTriangle, MapPin
} from 'lucide-react';
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

const CategoryGrid = () => {
    return (
        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            {categories.map((cat, index) => {
                const Icon = iconMap[cat.id] || MapPin;
                return (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -4 }}
                        transition={{ delay: index * 0.03, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="w-[calc(50%-24px)] sm:w-[calc(33.33%-32px)] md:w-[calc(25%-48px)] lg:w-[calc(14.28%-64px)] min-w-[140px]"
                    >
                        <Link
                            to={`/${cat.slug}`}
                            className="flex flex-col items-center group relative space-y-8"
                        >
                            <div className="relative w-full aspect-square flex items-center justify-center bg-white border border-forest-950/5 group-hover:border-gold-400 group-hover:shadow-premium transition-all duration-700 rounded-sm overflow-hidden">
                                {/* Archival Scanlines - Premium Finishing */}
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000 bg-[linear-gradient(rgba(18,38,32,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-10" />

                                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-gold-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative z-10 transition-transform duration-1000 group-hover:scale-110 text-forest-900 group-hover:text-gold-600">
                                    <Icon size={28} strokeWidth={1.5} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest-400 group-hover:text-gold-600/60 transition-colors text-center leading-none">
                                    Domain
                                </span>
                                <span className="text-[13px] uppercase tracking-[0.25em] font-black text-forest-950 group-hover:text-gold-600 transition-colors text-center px-2 leading-tight">
                                    {cat.name}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                )
            })}
        </div>
    );
};

export default CategoryGrid;
