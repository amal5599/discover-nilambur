import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Sparkles, GitCompare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInteraction } from '../../hooks/useInteraction';
import Card from './Card';
import Badge from './Badge';

const ListingCard = ({ place }) => {
    const { compareList, toggleCompare } = useInteraction();
    const isComparing = compareList.includes(place?.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} // inertia
            viewport={{ once: true }}
            className="h-full"
        >
            <div className={`group premium-card flex flex-col h-full bg-white relative hover:shadow-zenith hover:-translate-y-2 hover:scale-[1.01] transition-inertia overflow-hidden border border-forest-950/5 will-change-transform ${isComparing ? 'bg-gold-50/10 border-gold-500/20' : ''}`}>
                {/* Signature Border Technique - 4 Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold-500/40 opacity-40 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-700 pointer-events-none z-10" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold-500/40 opacity-40 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-700 pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold-500/40 opacity-40 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-700 pointer-events-none z-10" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold-500/40 opacity-40 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-700 pointer-events-none z-10" />

                <div className="relative aspect-[16/11] overflow-hidden group/image">
                    {/* Elite Ambient Hover Glow */}
                    <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/5 transition-inertia pointer-events-none z-10 blur-3xl scale-110" />
                    <Link to={`/place/${place?.slug || ''}`} className="block h-full">
                        <img
                            src={place?.images?.[0] || "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1200"}
                            alt={place?.name || "Nilambur Asset"}
                            loading="lazy"
                            className="w-full h-full object-cover transition-inertia group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                        />
                    </Link>

                    {/* Cinematic Overlay & Scanlines */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none z-10" />
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 z-20"
                        style={{ backgroundImage: 'linear-gradient(rgba(18, 38, 32, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 3px 100%' }} />

                    {/* Metadata Badges - Clinical Style */}
                    <div className="absolute top-6 left-6">
                        <span className="caption-elite bg-forest-950 text-gold-500 px-3 py-1.5 rounded-sm border border-white/10">
                            {place?.category}
                        </span>
                    </div>

                    <div className="absolute top-6 right-6 flex flex-col gap-3">
                        {place?.featured && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gold-500 text-forest-950 text-[8px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-[0_0_15px_rgba(184,134,59,0.3)] border border-white/20">
                                <Sparkles size={10} fill="currentColor" />
                                <span>Signature Asset</span>
                            </div>
                        )}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                toggleCompare(place?.id);
                            }}
                            className={`p-3 rounded-md backdrop-blur-md border transition-premium flex items-center justify-center ${isComparing ? 'bg-gold-500 text-forest-950 border-gold-400' : 'bg-white/10 text-white border-white/20 hover:bg-white/40'}`}
                        >
                            <GitCompare size={14} strokeWidth={1.5} className={isComparing ? 'animate-pulse' : ''} />
                        </button>
                    </div>

                    <div className="absolute bottom-10 left-8 right-8 flex items-center justify-between pointer-events-none transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-inertia z-30">
                        <div className="flex items-center gap-4">
                            <div className="w-2.5 h-2.5 bg-gold-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(184,134,59,0.8)]" />
                            <span className="text-[12px] font-black text-white uppercase tracking-[0.4em] italic drop-shadow-xl">Consult Protocol</span>
                        </div>
                        <ArrowRight className="text-gold-500 group-hover:translate-x-4 transition-inertia" size={18} strokeWidth={1.5} />
                    </div>
                </div>

                <div className="p-10 flex-1 flex flex-col space-y-8">
                    <div className="space-y-4">
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gold-600/70 block mb-1">Asset Identity</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-black text-forest-950 group-hover:text-gold-600 transition-colors uppercase tracking-tighter line-clamp-2 break-words leading-[1.1]">
                            {place?.name}
                        </h3>
                    </div>

                    <p className="body-elite !text-[15px] text-forest-700/80 italic line-clamp-2 leading-relaxed font-medium">
                        "{place?.description}"
                    </p>

                    <div className="mt-auto pt-8 border-t border-forest-950/5 flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-forest-600">
                            <MapPin size={14} className="text-gold-700 opacity-80" />
                            <span className="text-[12px] uppercase tracking-[0.2em] font-black truncate max-w-[140px]">
                                {place?.location}
                            </span>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Star size={12} fill="currentColor" className="text-gold-600" />
                                <span className="text-[13px] font-black text-forest-950">{place?.rating}</span>
                            </div>
                            <span className="text-forest-950 font-black text-[12px] tracking-[0.3em] uppercase">{place?.priceRange}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ListingCard;
