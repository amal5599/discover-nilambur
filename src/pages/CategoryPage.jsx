import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import categories from '../data/categories.json';
import places from '../data/places.json';
import ListingCard from '../components/common/ListingCard';
import { motion } from 'framer-motion';
import { ChevronRight, Map as MapIcon, Sparkles } from 'lucide-react';

const CategoryPage = () => {
    const { category: categorySlug } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categorySlug]);

    const category = useMemo(() =>
        categories.find(c => c.slug === categorySlug),
        [categorySlug]);

    const categoryPlaces = useMemo(() =>
        places.filter(p => p.category === categorySlug),
        [categorySlug]);

    if (!category) {
        return (
            <div className="pt-64 text-center min-h-screen bg-white">
                <h1 className="text-4xl font-serif font-bold text-forest-950 italic tracking-tighter uppercase">Experience Sector Unrecognized</h1>
                <Link to="/" className="text-gold-600 mt-12 inline-block font-black uppercase tracking-[0.4em] text-[10px] border-b border-gold-400 pb-4">Return to Core Sanctuary</Link>
            </div>
        );
    }

    return (
        <div className="bg-cream-50 min-h-screen">
            {/* Cinematic Hero Banner */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-forest-950">
                <div className="absolute inset-0">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.5 }}
                        transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
                        src={categoryPlaces[0]?.images[0] || "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2400"}
                        alt={category.name}
                        className="w-full h-full object-cover grayscale-[30%]"
                    />
                    {/* Archival Overlays */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(90deg,rgba(184,134,59,0.1)_1px,transparent_1px),linear-gradient(rgba(184,134,59,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/20 to-transparent" />
                </div>

                {/* Tactical Registry Metadata */}
                <div className="absolute top-12 right-12 z-20 hidden lg:block text-right">
                    <div className="space-y-1 opacity-40">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Taxonomy Sector</span>
                        <p className="text-[8px] font-mono text-gold-500 tracking-[0.2em]">{category.slug.toUpperCase()} PROTOCOL [01]</p>
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10 w-full space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        className="space-y-12"
                    >
                        <nav className="breadcrumb-elite">
                            <Link to="/" className="breadcrumb-link">Home</Link>
                            <ChevronRight size={10} className="opacity-20" />
                            <Link to="/explore" className="breadcrumb-link">Intelligence Vault</Link>
                            <ChevronRight size={10} className="opacity-20" />
                            <span className="breadcrumb-active">{category.name}</span>
                        </nav>

                        <div className="space-y-6">
                            <span className="hero-subtitle-refined">Taxonomic Stratum</span>
                            <h1 className="hero-title text-white italic tracking-tighter leading-none">{category.name}</h1>
                        </div>

                        <div className="max-w-3xl border-l border-gold-400/40 pl-10">
                            <p className="body-elite text-white/95 text-[18px] md:text-[20px] font-serif italic leading-relaxed italic-shadow">
                                "{category.description}"
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Vertical Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 font-black">Scroll Protocol</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gold-600 to-transparent" />
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-24 relative">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-16">
                        <div className="space-y-10">
                            <span className="caption-elite text-gold-600">Asset Inventory Index</span>
                            <h2 className="section-title italic text-forest-950">Strategic <span className="text-forest-300">Catalog</span></h2>
                            <p className="text-2xl text-forest-700 font-serif italic italic-shadow max-w-2xl leading-relaxed">"Discover {categoryPlaces.length} exclusive preservation assets categorized within the {category.name.toLowerCase()} intelligence sector."</p>
                        </div>
                        <Link
                            to="/explore"
                            className="bg-forest-950 hover:bg-gold-600 text-white hover:text-forest-950 py-6 px-12 text-[11px] font-black uppercase tracking-[0.6em] transition-all duration-1000 flex items-center justify-center space-x-6 rounded-sm shadow-premium"
                        >
                            <span>Explorer Intelligence</span>
                            <MapIcon size={16} strokeWidth={1} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {categoryPlaces.map((place, idx) => (
                            <motion.div
                                key={place.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                                viewport={{ once: true }}
                            >
                                <ListingCard place={place} />
                            </motion.div>
                        ))}
                    </div>

                    {categoryPlaces.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-sm border border-forest-950/5 shadow-premium max-w-5xl mx-auto px-12 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold-500/50" />
                            <Sparkles className="mx-auto text-gold-500 mb-12 opacity-60" size={64} strokeWidth={0.5} />
                            <p className="text-2xl text-forest-600 font-serif italic italic-shadow leading-relaxed">"The sanctuary is currently quiet. <br />Inventory updates pending."</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryPage;
