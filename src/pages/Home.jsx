import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MoveRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryGrid from '../components/home/CategoryGrid';
import ListingCard from '../components/common/ListingCard';
import CompareBar from '../components/explore/CompareBar';
import CompareModal from '../components/explore/CompareModal';
import places from '../data/places.json';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

import { useInteraction } from '../hooks/useInteraction';

import Hero from '../components/home/Hero';

const Home = () => {
    const { history } = useInteraction();
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const featuredPlaces = places.filter(p => p.featured).slice(0, 4);
    const recentlyViewed = history.map(id => places.find(p => p.id === id)).filter(Boolean);

    return (
        <div className="overflow-x-hidden bg-forest-50/30">
            {/* Cinematic Hero Section */}
            <Hero />

            {/* Category Intelligence - Architectural Spacing */}

            <section className="py-24 bg-cream-50">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
                        <div className="lg:col-span-12 flex flex-col items-center text-center space-y-8">
                            <span className="caption-elite text-gold-600">Terrestrial Heritage</span>
                            <h2 className="section-title text-forest-950">Curating the <span className="italic-accent text-forest-300">Nilambur Chronicle</span></h2>
                            <p className="body-elite max-w-2xl text-forest-600/90 font-medium">
                                A meticulous exploration of the Nilambur ecosystem. Each destination is chosen for its heritage depth and preservation integrity.
                            </p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <CategoryGrid />
                    </motion.div>
                </div>
            </section>

            {/* Featured Destinations - Luxury Grid */}
            <section className="py-24 bg-white border-y border-forest-950/5 relative overflow-hidden">
                {/* Decorative Signature Backdrop */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500 rounded-full blur-[200px] -mr-96 -mt-96" />
                </div>

                <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10">
                    <div className="flex flex-col lg:items-center text-center space-y-8 mb-20">
                        <div className="inline-flex items-center space-x-6">
                            <div className="h-px w-12 bg-gold-400/30" />
                            <span className="caption-elite text-gold-600">Reserved for the Curious</span>
                            <div className="h-px w-12 bg-gold-400/30" />
                        </div>
                        <h2 className="hero-title text-forest-950 italic leading-none drop-shadow-sm">
                            Signature <span className="italic-accent text-forest-300">Landscapes</span>
                        </h2>
                        <p className="body-elite text-forest-600 max-w-2xl mx-auto italic">
                            "A carefully curated collection of destinations, designed for those who seek the definitive heritage experience."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {featuredPlaces.map((place, idx) => (
                            <motion.div
                                key={place.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ListingCard place={place} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Link to="/explore" className="btn-secondary group inline-flex">
                            Explore the Full Heritage Atlas <MoveRight size={18} strokeWidth={1} className="ml-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Discovery Intelligence - Quantified Authority */}
            <section className="py-24 bg-forest-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
                    <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
                </div>
                <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 text-center">
                        {[
                            { label: "Preserved Sites", value: "150+" },
                            { label: "Guided Journeys", value: "12" },
                            { label: "Conservation Status", value: "Verified" },
                            { label: "Ecosystem Integrity", value: "100%" }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.8 }}
                                className="space-y-4"
                            >
                                <div className="text-5xl md:text-6xl font-serif font-black text-gold-500 italic leading-none">{stat.value}</div>
                                <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/80">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Experiences Section - Selective Curation */}
            {/* Trending Experiences - Dynamic Intelligence */}
            <section className="py-24 bg-white/40">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                    <div className="flex flex-col space-y-8 mb-20">
                        <span className="caption-elite text-gold-600">Active Narratives</span>
                        <h2 className="section-title text-forest-950">Trending <span className="italic-accent text-forest-300">Discovery Chapters</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { title: "Monsoon Trails", subtitle: "Seasonal curation of rainforest treks", icon: Sparkles },
                            { title: "Teak Heritage", subtitle: "Deep dive into 19th-century plantations", icon: Sparkles },
                            { title: "Culinary Map", subtitle: "A journey through traditional Malabar flavors", icon: Sparkles }
                        ].map((trend, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 1 }}
                                className="group relative p-10 bg-white border border-forest-950/5 rounded-md hover:shadow-soft transition-premium"
                            >
                                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Archival Scanlines */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 bg-[linear-gradient(rgba(18,38,32,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />

                                <trend.icon className="text-gold-500 mb-10 transition-transform duration-700 group-hover:scale-110" size={24} strokeWidth={1} />

                                <div className="space-y-4 mb-10">
                                    <h4 className="text-xl font-serif font-bold text-forest-950 group-hover:text-gold-600 transition-colors uppercase tracking-tight">
                                        {trend.title}
                                    </h4>
                                    <p className="body-elite text-forest-600 leading-relaxed line-clamp-2">
                                        {trend.subtitle}
                                    </p>
                                </div>

                                <Link to="/guides" className="inline-flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.3em] text-forest-950 border-b border-forest-900/10 pb-2 group-hover:border-gold-500 transition-premium">
                                    <span>Begin Experience</span>
                                    <ArrowRight size={14} className="transition-transform duration-700 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recently Viewed - Personal Atlas */}
            {recentlyViewed.length > 0 && (
                <section className="py-24 bg-white border-b border-forest-950/5">
                    <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                        <div className="flex items-center justify-between mb-16">
                            <div className="space-y-3">
                                <span className="caption-elite text-gold-600">Personal Atlas</span>
                                <h3 className="section-title-sm text-forest-950">Recently <span className="italic-accent text-forest-300">Consulted</span></h3>
                            </div>
                            <Link to="/explore" className="text-[10px] uppercase tracking-[0.3em] font-bold text-forest-400 hover:text-gold-600 transition-premium">Expand Inquiry Matrix →</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
                            {recentlyViewed.slice(0, 5).map((place) => (
                                <Link key={place.id} to={`/place/${place.slug}`} className="group space-y-4">
                                    <div className="aspect-[3/4] rounded-md overflow-hidden border border-forest-950/5 shadow-soft">
                                        <img src={place.images[0]} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-premium group-hover:scale-105" alt={place.name} loading="lazy" />
                                    </div>
                                    <h4 className="text-[11px] font-bold text-forest-950 group-hover:text-gold-600 truncate uppercase tracking-tight">{place.name}</h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Heritage Narrative - Scripted Legacy */}
            <section className="py-24 bg-cream-50 relative overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="aspect-[4/5] border border-forest-950/5 p-4 bg-white rounded-md shadow-premium group">
                                <div className="w-full h-full overflow-hidden relative rounded-sm">
                                    <img
                                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1400"
                                        alt="Nilambur Legacy"
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale transition-transform duration-[4s] group-hover:scale-105 opacity-70"
                                    />
                                    <div className="absolute inset-0 bg-forest-950/20 mix-blend-multiply" />
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gold-500 flex flex-col items-center justify-center p-6 shadow-premium transform rotate-3 text-forest-950 rounded-sm">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 leading-none opacity-60">Established</span>
                                    <span className="text-5xl font-serif font-black tracking-tighter leading-none">1840</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="lg:col-span-1" />

                        <div className="lg:col-span-6 space-y-12">
                            <div className="space-y-8">
                                <span className="caption-elite text-gold-600">The Scripted Legacy</span>
                                <h2 className="section-title text-forest-950 italic drop-shadow-sm">Natural <br /><span className="text-forest-200">Preservation Archive</span></h2>
                                <div className="space-y-8 border-l border-gold-400/20 pl-10 mt-12">
                                    <p className="body-elite text-forest-900 text-2xl font-serif italic italic-shadow leading-relaxed">
                                        "Nilambur is not merely a destination; it is a living history, carefully documented for the sophisticated observer."
                                    </p>
                                    <p className="body-elite text-forest-600 leading-relaxed max-w-xl">
                                        From the world's oldest teak plantation established in 1846 to the complex waterways of the Chaliyar Basin, our ecosystem maintains a definitive record of Kerala's natural heritage.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-forest-950/10">
                                {[
                                    { title: "Archetype Status", value: "Teak Sanctuary" },
                                    { title: "Governance", value: "Royal Legacy" }
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <p className="caption-elite text-forest-400 font-extrabold">{item.title}</p>
                                        <p className="text-xl font-serif font-bold text-forest-950 tracking-tight uppercase">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CompareBar onOpenCompare={() => setIsCompareModalOpen(true)} />
            <CompareModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
            />
        </div>
    );
};

export default Home;
