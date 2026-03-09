import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link, Routes, Route, NavLink } from 'react-router-dom';
import places from '../data/places.json';
import { Star, Clock, ChevronRight, Grid, Info, Navigation, History, Heart, Share2, X, MoveRight, GitCompare, Sparkles, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MiniMap from '../components/common/MiniMap';
import { useInteraction } from '../hooks/useInteraction';

const NavItem = ({ to, label, slug, icon: Icon }) => (
    <NavLink
        to={to}
        end={to === `/place/${slug || ''}`}
        className={({ isActive }) => `
            relative flex items-center space-x-3 px-10 py-6 group transition-premium
            ${isActive ? 'text-forest-950 font-bold' : 'text-forest-400 font-bold hover:text-forest-700'}
        `}
    >
        {({ isActive }) => {
            const NavItemIcon = Icon;
            return (
                <>
                    <NavItemIcon size={14} className={isActive ? 'text-gold-600' : 'opacity-40'} />
                    <span className="text-[11px] uppercase tracking-[0.3em]">{label}</span>
                    {isActive && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                        />
                    )}
                </>
            );
        }}
    </NavLink>
);

const PlaceDetail = () => {
    const { slug } = useParams();
    const { wishlist, toggleWishlist, addToHistory, toggleCompare, compareList } = useInteraction();

    const place = useMemo(() =>
        slug ? places.find(p => p.slug === slug) : null,
        [slug]);

    const [selectedImg, setSelectedImg] = useState(null);
    const isFavorited = place ? wishlist.includes(place.id) : false;

    useEffect(() => {
        if (place) {
            addToHistory(place.id);
            window.scrollTo(0, 0);
        }
    }, [place, addToHistory]);

    const toggleFavorite = () => {
        if (place) toggleWishlist(place.id);
    };

    const handleShare = async () => {
        if (!place) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Discover ${place.name}`,
                    text: place.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    if (!place) return (
        <div className="pt-60 pb-40 text-center bg-forest-950 min-h-screen flex flex-col items-center justify-center space-y-8">
            <div className="w-16 h-16 border border-gold-500/30 rounded-full flex items-center justify-center animate-pulse">
                <X size={32} className="text-gold-500" />
            </div>
            <div className="space-y-4">
                <h2 className="text-2xl font-serif font-black text-white uppercase tracking-[0.4em]">Archive Error</h2>
                <p className="text-[10px] font-bold text-forest-300 uppercase tracking-[0.2em]">The requested destination narrative is currently unavailable within the collective record.</p>
            </div>
            <Link to="/explore" className="btn-primary mt-12">Return to the Collective Record</Link>
        </div>
    );

    return (
        <div className="bg-cream-50 min-h-screen">
            {/* Cinematic Hero Header */}
            <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-forest-950">
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0"
                >
                    <img
                        src={place?.images?.[0] || ""}
                        alt={place?.name || ""}
                        className="w-full h-full object-cover opacity-60 grayscale-[20%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-transparent to-transparent h-1/4" />
                </motion.div>

                <div className="absolute bottom-12 right-12 z-20 hidden md:block text-right">
                    <div className="space-y-2 opacity-40">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Chronicle ID</span>
                        <p className="text-[9px] font-mono text-gold-500">{place.id.slice(0, 12).toUpperCase()}</p>
                        <div className="flex items-center justify-end gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-white/60">
                            <Sparkles size={8} className="text-gold-500" />
                            <span>Authentic Heritage Site</span>
                        </div>
                    </div>
                </div>

                <div className="absolute top-28 left-0 w-full z-20">
                    <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                        <nav className="breadcrumb-elite">
                            <Link to="/" className="breadcrumb-link">Home</Link>
                            <ChevronRight size={10} className="opacity-20" />
                            <Link to="/explore" className="breadcrumb-link">The Collective Record</Link>
                            <ChevronRight size={10} className="opacity-20" />
                            <span className="breadcrumb-active truncate max-w-[200px]">{place.name}</span>
                        </nav>
                    </div>
                </div>

                <div className="absolute bottom-20 left-0 w-full z-20">
                    <div className="max-w-[1600px] mx-auto px-8 md:px-12 space-y-10">
                        <div className="max-w-5xl space-y-6">
                            <div className="flex items-center space-x-6">
                                <div className="h-px w-10 bg-gold-400/20" />
                                <span className="hero-subtitle-refined">{place.category}</span>
                            </div>
                            <h1 className="hero-title text-white italic tracking-tighter leading-none">
                                {(() => {
                                    const name = place.name;
                                    let parts = [];
                                    if (name.includes(' & ')) {
                                        parts = name.split(' & ');
                                        parts[1] = '& ' + parts[1];
                                    } else if (name.includes(' - ')) {
                                        parts = name.split(' - ');
                                        parts[1] = '- ' + parts[1];
                                    } else {
                                        const firstSpaceIdx = name.indexOf(' ');
                                        if (firstSpaceIdx !== -1) {
                                            parts = [name.substring(0, firstSpaceIdx), name.substring(firstSpaceIdx + 1)];
                                        } else {
                                            parts = [name];
                                        }
                                    }

                                    return parts.map((part, i) => (
                                        <span key={i} className={i === 1 ? 'text-gold-500 font-light block mt-4 md:mt-6' : ''}>
                                            {part}
                                        </span>
                                    ));
                                })()}
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                            <div className="glass-premium px-8 py-4 rounded-md border border-white/20 flex items-center space-x-6">
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold">Quality Curation</span>
                                    <span className="text-xl font-bold text-white tracking-tight leading-none">{place.rating} / 5.0</span>
                                </div>
                                <div className="flex text-gold-500">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" opacity={i < Math.floor(place.rating) ? 1 : 0.1} />)}
                                </div>
                            </div>

                            <div className="glass-premium px-8 py-4 rounded-md border border-white/20 flex items-center space-x-6">
                                <div className="p-2 bg-gold-500/10 rounded-sm">
                                    <Clock className="text-gold-400" size={14} strokeWidth={1} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold">Conservation Status</span>
                                    <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">{place.openStatus === 'Open' ? 'Active Hosting' : 'Maintenance'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleFavorite}
                                className={`p-4 bg-white/5 backdrop-blur-md rounded-md border transition-premium shadow-soft ${isFavorited
                                    ? 'bg-gold-500/20 border-gold-500 text-gold-500'
                                    : 'border-white/10 text-white hover:bg-white hover:text-forest-950'
                                    }`}
                            >
                                <Heart size={18} strokeWidth={1.5} fill={isFavorited ? 'currentColor' : 'none'} />
                            </button>
                            <button
                                onClick={() => place && toggleCompare(place.id)}
                                className={`p-4 bg-white/5 backdrop-blur-md rounded-md border transition-premium shadow-soft ${place && compareList.includes(place.id)
                                    ? 'bg-gold-500/20 border-gold-500 text-gold-500'
                                    : 'border-white/10 text-white hover:bg-white hover:text-forest-950'
                                    }`}
                                title="Add to Comparison Archive"
                            >
                                <GitCompare size={18} strokeWidth={1.5} className={place && compareList.includes(place.id) ? 'animate-pulse' : ''} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-4 bg-white/5 backdrop-blur-md rounded-md border border-white/10 text-white hover:bg-white hover:text-forest-950 transition-premium shadow-soft"
                            >
                                <Share2 size={18} strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Detail Navigation */}
            <section className="bg-white border-b border-forest-950/5 sticky top-20 z-40 shadow-soft">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                    <nav className="flex items-center overflow-x-auto no-scrollbar">
                        <NavItem to={`/place/${slug}`} icon={Info} label="Chronicle Overview" slug={slug} />
                        <NavItem to={`/place/${slug}/gallery`} icon={Grid} label="Visual Archive" slug={slug} />
                        <NavItem to={`/place/${slug}/experience`} icon={Navigation} label="Spatial Experience" slug={slug} />
                        {place.history && <NavItem to={`/place/${slug}/history`} icon={History} label="Heritage Codex" slug={slug} />}
                    </nav>
                </div>
            </section>

            {/* Content Routes */}
            <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                <Routes>
                    <Route index element={
                        <section className="py-20 lg:py-24">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                                <div className="lg:col-span-8 space-y-20 lg:space-y-24">
                                    {/* Site Specifications Bar */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 bg-white rounded-md border border-forest-950/5 shadow-soft overflow-hidden relative group">
                                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-gold-500/30" />

                                        {/* Archival Scanline Effect */}
                                        <div className="absolute inset-0 pointer-events-none opacity-[0.01] group-hover:opacity-[0.03] transition-opacity duration-700 bg-[linear-gradient(rgba(18,38,32,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />
                                        {[
                                            { label: "Optimum Phase", value: place.bestTime || "Nov - Mar", icon: Clock },
                                            { label: "Temporal Window", value: place.visitDuration || "2-3 Hours", icon: History },
                                            { label: "Public Access", value: "Standard entry", icon: Navigation },
                                            { label: "Resonance", value: place.category === 'Waterfalls' ? 'Misty' : 'Serene', icon: Sparkles }
                                        ].map((fact, idx) => (
                                            <div key={idx} className="space-y-3">
                                                <div className="flex items-center gap-3 text-forest-500">
                                                    <fact.icon size={12} strokeWidth={2} />
                                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-forest-400">{fact.label}</span>
                                                </div>
                                                <p className="text-[15px] font-serif font-black text-forest-950 tracking-tight">{fact.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-8">
                                        <span className="caption-elite text-gold-600">The Narrative</span>
                                        <h2 className="section-title italic">Heritage & <br /><span className="italic-accent text-forest-300">Architecture</span></h2>
                                        <p className="body-elite text-xl text-forest-600/90 italic">
                                            "{place.description}"
                                        </p>
                                    </div>

                                    {/* Authenticity Record - Technical Chronicle */}
                                    <div className="bg-white rounded-md border border-forest-950/5 shadow-soft p-12 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                                            <div className="text-[120px] font-black uppercase tracking-tighter leading-none border-b-8 border-forest-950">AUTHENTIC</div>
                                            <div className="text-[40px] font-black uppercase tracking-[0.5em] text-right mt-4">HERITAGE SITE</div>
                                        </div>

                                        <div className="relative z-10 space-y-12">
                                            <div className="flex items-center space-x-6">
                                                <div className="h-px w-10 bg-gold-400/30" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-600">Chronicle Record No. {place.id.substring(0, 8).toUpperCase()}</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                                {[
                                                    { label: "Preservation Status", value: "Active Archive", color: "text-forest-600" },
                                                    { label: "Catalog Taxonomy", value: place.category.toUpperCase(), color: "text-forest-950" },
                                                    { label: "Material Integrity", value: "Heritage Core", color: "text-gold-600" }
                                                ].map((stat, idx) => (
                                                    <div key={idx} className="space-y-3 p-6 bg-forest-50/30 rounded-sm border border-forest-950/[0.03]">
                                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-forest-400">{stat.label}</span>
                                                        <p className={`text-lg font-serif font-black italic tracking-tight ${stat.color} drop-shadow-sm`} style={{ textShadow: idx === 2 ? 'var(--dossier-text-glow)' : 'none' }}>
                                                            {stat.value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-8 border-t border-forest-950/5 flex items-center justify-between text-[8px] font-black uppercase tracking-[0.5em] text-forest-200">
                                                <span>Registry Date: MMXXVI</span>
                                                <span className="italic">Authorized by Nilambur Heritage Bureau</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="aspect-[16/10] rounded-sm overflow-hidden shadow-premium border border-forest-950/5 group">
                                            <img src={place?.images?.[1] || place?.images?.[0]} alt="Sensory 1" className="w-full h-full object-cover grayscale-[20%] transition-transform duration-[2.5s] group-hover:scale-110" />
                                        </div>
                                        <div className="aspect-[16/10] rounded-sm overflow-hidden shadow-premium border border-forest-950/5 group mt-16">
                                            <img src={place?.images?.[2] || place?.images?.[0]} alt="Sensory 2" className="w-full h-full object-cover grayscale-[20%] transition-transform duration-[2.5s] group-hover:scale-110" />
                                        </div>
                                    </div>

                                    {/* Nearby Carousel - Proximity Discovery */}
                                    <div className="pt-24 space-y-12">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-4">
                                                <span className="caption-elite text-gold-600">Proximity Discovery</span>
                                                <h3 className="text-3xl font-serif font-black italic text-forest-950">Extend the <span className="italic-accent text-forest-300">Chronicle</span></h3>
                                            </div>
                                            <Link to="/explore" className="text-[10px] uppercase tracking-[0.3em] font-bold text-forest-950 hover:text-gold-600 flex items-center border-b border-forest-950/10 pb-2 transition-premium">
                                                Expand Atlas <MoveRight size={14} strokeWidth={1} className="ml-4" />
                                            </Link>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                            {places.filter(p => p.id !== place.id && p.category === place.category).slice(0, 2).map((nearby) => (
                                                <Link key={nearby.id} to={`/place/${nearby.slug}`} className="group relative p-6 bg-white border border-forest-950/5 rounded-md hover:shadow-soft transition-premium">
                                                    <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                                                    <div className="aspect-[16/9] rounded-sm overflow-hidden mb-6 shadow-soft border border-forest-950/5 relative">
                                                        <img src={nearby.images[0]} className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100" alt={nearby.name} />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-forest-300">{nearby.category}</span>
                                                        <h4 className="text-xl font-serif font-bold text-forest-950 group-hover:text-gold-600 transition-colors tracking-tight uppercase">{nearby.name}</h4>
                                                        <div className="flex items-center gap-2">
                                                            <MapPin size={12} className="text-gold-500 opacity-60" />
                                                            <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-forest-400">{nearby.location}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-4 space-y-8 md:space-y-12">
                                    <div className="bg-forest-950 p-10 md:p-14 rounded-md shadow-premium text-white relative overflow-hidden group border border-white/5">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                        <div className="space-y-4 mb-12 md:mb-16">
                                            <span className="caption-elite text-gold-500">Logistics Detail</span>
                                            <h3 className="section-title text-white italic text-4xl leading-tight">Journey <br /><span className="text-forest-400">Details</span></h3>
                                        </div>
                                        <div className="space-y-10 relative z-10">
                                            {[
                                                { label: "Geographic Coordinates", value: place?.location || "Nilambur, Kerala" },
                                                { label: "Asset Valuation", value: place?.priceRange || "Inquiry Required" },
                                                { label: "Operational Cycles", value: place?.openHours || "0900 — 1700 HRS" },
                                                { label: "Communication Channel", value: place?.contact || "+91 483 270 2000" }
                                            ].map((item, idx) => (
                                                <div key={idx} className="space-y-2 group-hover:translate-x-1 transition-premium">
                                                    <p className="text-[9px] uppercase tracking-[0.3em] text-gold-500 font-black">{item.label}</p>
                                                    <p className="text-xl font-serif font-bold text-white tracking-tight italic">{item.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => window.open(`https://www.google.com/maps?q=${place.coordinates[0]},${place.coordinates[1]}`, '_blank')}
                                            className="btn-primary w-full mt-16 bg-gold-600 text-forest-950 rounded-md py-6 text-[11px]"
                                        >
                                            <span>Initiate Navigation</span>
                                            <MoveRight size={14} strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="bg-white border border-forest-950/5 rounded-md p-10 md:p-12 shadow-soft space-y-10 group">
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-forest-300 mb-8">Systems & Amenities</h4>
                                        <div className="grid grid-cols-2 gap-8">
                                            {place?.amenities?.map(item => (
                                                <div key={item} className="flex items-center space-x-3 group/item">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500/40 group-hover/item:bg-gold-500 transition-premium" />
                                                    <span className="text-[11px] font-bold text-forest-950 uppercase tracking-tight">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    } />

                    <Route path="gallery" element={
                        <section className="py-24">
                            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                                <div className="space-y-6">
                                    <span className="caption-elite text-gold-600">Visual Documentation</span>
                                    <h2 className="section-title italic">The <span className="italic-accent text-forest-300">Gallery</span></h2>
                                </div>
                                <p className="text-forest-200/40 text-[10px] font-bold uppercase tracking-[0.2em]">Captured Perspectives © 2026</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {place.images.map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => setSelectedImg(img)}
                                        className={`cursor-pointer relative rounded-md overflow-hidden group hover:shadow-hover transition-all duration-700 ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                                    >
                                        <img
                                            src={img}
                                            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                                            alt={`${place.name} ${idx + 1}`}
                                        />
                                        <div className="absolute inset-0 bg-forest-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                                            <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transform scale-50 group-hover:scale-100 transition-premium">
                                                <Grid size={24} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    } />

                    <Route path="experience" element={
                        <section className="py-24">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                                <div className="lg:col-span-12 space-y-12">
                                    <div className="space-y-6">
                                        <span className="caption-elite text-gold-600">Human Resonance</span>
                                        <h2 className="section-title italic leading-none">The <span className="italic-accent text-forest-300">Experience</span></h2>
                                        <p className="body-elite text-lg md:text-xl leading-relaxed italic max-w-4xl text-forest-600/80">
                                            "{place.visitorInfo}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                        <div className="bg-white p-10 md:p-12 rounded-md border border-forest-950/5 space-y-8 shadow-soft">
                                            <h4 className="text-[11px] font-bold text-forest-950 uppercase tracking-[0.3em] border-b border-forest-950/10 pb-6">Environmental Care</h4>
                                            <div className="space-y-4">
                                                {[
                                                    "Maintain Material Honor",
                                                    "Preserve Natural Silence",
                                                    "Follow Curation Paths",
                                                    "Capture with Discretion"
                                                ].map((rule, idx) => (
                                                    <div key={idx} className="flex items-center space-x-4 group/rule">
                                                        <div className="w-6 h-px bg-gold-500/30 group-hover/rule:w-10 group-hover/rule:bg-gold-500 transition-premium" />
                                                        <span className="text-base font-serif font-bold text-forest-700 italic group-hover/rule:text-forest-950 transition-colors tracking-tight">{rule}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-white p-10 md:p-12 rounded-md border border-forest-950/5 space-y-8 shadow-soft">
                                            <h4 className="text-[11px] font-bold text-forest-950 uppercase tracking-[0.3em] border-b border-forest-950/10 pb-6">Admission Policy</h4>
                                            <div className="space-y-6">
                                                {[
                                                    { label: "Heritage View", price: "₹250" },
                                                    { label: "Core Explorer", price: "₹100" },
                                                    { label: "Junior Access", price: "Complimentary" }
                                                ].map((fee, idx) => (
                                                    <div key={idx} className="flex justify-between items-center group/fee">
                                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-forest-300 group-hover/fee:text-gold-600 transition-colors">{fee.label}</span>
                                                        <span className="text-lg font-bold text-forest-950 tracking-wide">{fee.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-24 md:mt-32">
                                <div className="mb-16 space-y-6">
                                    <span className="caption-elite text-gold-600">Spatial Context</span>
                                    <h2 className="section-title italic">Locate the <span className="italic-accent text-forest-300">Sanctuary</span></h2>
                                </div>
                                <div className="h-[500px] md:h-[600px] rounded-md overflow-hidden border border-forest-950/5 shadow-premium">
                                    <MiniMap position={place.coordinates} name={place.name} />
                                </div>
                            </div>
                        </section>
                    } />

                    {place.history && (
                        <Route path="history" element={
                            <section className="py-24">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                                    <div className="lg:col-span-8 space-y-12 md:space-y-16">
                                        <div className="space-y-6">
                                            <span className="caption-elite text-gold-600">Historical Inheritance</span>
                                            <h2 className="section-title italic leading-none">Legacy of <br /><span className="italic-accent text-forest-300">Timber & Gold</span></h2>
                                        </div>
                                        <div className="p-10 md:p-14 bg-white border border-forest-950/5 rounded-md shadow-soft italic text-forest-900 font-serif space-y-10 md:space-y-12">
                                            <p className="text-xl md:text-2xl leading-relaxed font-medium">
                                                {place.history}
                                            </p>
                                            <div className="pt-10 md:pt-12 border-t border-forest-950/5 space-y-6">
                                                <p className="text-xl md:text-2xl leading-relaxed text-forest-300 italic opacity-60">
                                                    "Nilambur serves as the spiritual guardian of timber heritage. Every visit is a step back into a majestic timeline."
                                                </p>
                                                <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-gold-600 leading-none">— Historical Bureau Custodians</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        } />
                    )}
                </Routes>
            </div >

            {/* Lightbox */}
            < AnimatePresence >
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 bg-forest-950/98 backdrop-blur-xl z-[100] flex items-center justify-center p-12"
                    >
                        <button className="absolute top-12 right-12 text-white hover:text-gold-500 transition-premium">
                            <X size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            src={selectedImg}
                            alt="Gallery Preview"
                            className="max-w-full max-h-full rounded-md shadow-hover border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence >
        </div >
    );
};

export default PlaceDetail;
