import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, ArrowRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [query, setQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showInterface, setShowInterface] = useState(false);

    const { scrollY } = useScroll();
    const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const textY = useTransform(scrollY, [0, 300], [0, 50]);
    const fogX1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const fogX2 = useTransform(scrollY, [0, 1000], [0, -150]);

    const suggestions = [
        "Teak Museum",
        "Conolly's Plot",
        "Adyanpara Waterfalls",
        "Nedumkayam Rainforest",
        "Nilambur Kovilakam"
    ];

    const filteredSuggestions = suggestions.filter(s =>
        s.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const timer = setTimeout(() => setShowInterface(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (searchTerm = query) => {
        if (!searchTerm.trim()) return;
        const params = new URLSearchParams();
        params.set('q', searchTerm.trim());
        navigate(`/search?${params.toString()}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex(prev => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0) {
                handleSearch(filteredSuggestions[selectedIndex]);
            } else {
                handleSearch();
            }
        } else if (e.key === 'Escape') {
            setIsSearchFocused(false);
            setShowSuggestions(false);
        }
    };

    return (
        <section ref={containerRef} className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-[#050705]">
            {/* 1. Atmospheric Opening & Landscape Reveal */}
            <div className="absolute inset-0 z-0">
                {/* Background Forest Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
                    animate={{ opacity: 0.65, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full will-change-transform"
                >
                    <img
                        src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2400"
                        alt="Nilambur Rain Forest"
                        className="w-full h-full object-cover grayscale-[40%] contrast-125"
                        fetchpriority="high"
                        loading="eager"
                    />
                </motion.div>

                {/* Fog Layers */}
                <motion.div
                    style={{ x: fogX1 }}
                    className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] bg-repeat"
                />
                <motion.div
                    style={{ x: fogX2 }}
                    className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] bg-repeat rotate-180"
                />

                {/* Depth Overlays - Fixed to avoid 'blue glow' artifact */}
                <div className="absolute inset-0 bg-gradient-to-b from-forest-950/90 via-transparent to-forest-950/95" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,10,5,0.95)_100%)]" />

                {/* Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full"
                            initial={{
                                x: Math.random() * 100 + '%',
                                y: Math.random() * 100 + '%',
                                opacity: 0
                            }}
                            animate={{
                                y: [null, '-30%'],
                                opacity: [0, 0.4, 0]
                            }}
                            transition={{
                                duration: 8 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 10
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
                {/* 3. Headline Reveal */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="text-center mb-16"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 2.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-9xl font-serif text-white tracking-tight mb-4"
                    >
                        THE SANCTUARY
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: '0.1em' }}
                        animate={{ opacity: 0.8, letterSpacing: '0.6em' }}
                        transition={{ duration: 3, delay: 1.5, ease: "easeOut" }}
                        className="text-gold-400 font-light text-xs md:text-sm uppercase"
                    >
                        OF NILAMBUR LEGACY
                    </motion.p>
                </motion.div>

                {/* 4. Interface Reveal (Glass Panel) */}
                <AnimatePresence>
                    {showInterface && (
                        <motion.div
                            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-3xl"
                        >
                            <div className="relative group">
                                {/* Glass Background with subtle glow */}
                                <div className="absolute -inset-1 bg-gold-500/5 rounded-md blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-md p-3 shadow-zenith overflow-visible">
                                    <div className="flex flex-col md:flex-row items-stretch gap-4">
                                        {/* SECTION 1: Search Field */}
                                        <div className="flex-grow relative">
                                            <div className="flex items-center space-x-4 px-6 h-16">
                                                <Search size={18} className={`transition-colors duration-500 ${isSearchFocused ? 'text-gold-400' : 'text-white/40'}`} />
                                                <input
                                                    type="text"
                                                    value={query}
                                                    onChange={(e) => {
                                                        setQuery(e.target.value);
                                                        setShowSuggestions(true);
                                                        setSelectedIndex(-1);
                                                    }}
                                                    onFocus={() => {
                                                        setIsSearchFocused(true);
                                                        if (query.length > 0) setShowSuggestions(true);
                                                    }}
                                                    onBlur={() => {
                                                        setIsSearchFocused(false);
                                                        setTimeout(() => setShowSuggestions(false), 200);
                                                    }}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder="Search rainforests, rivers, heritage..."
                                                    className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/30 font-serif text-xl focus:ring-0 p-0"
                                                />
                                            </div>

                                            {/* DROPDOWN SUGGESTIONS */}
                                            <AnimatePresence>
                                                {showSuggestions && query.length > 0 && filteredSuggestions.length > 0 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute top-full left-0 right-0 mt-3 bg-forest-950/98 backdrop-blur-3xl border border-white/10 rounded-sm overflow-hidden z-[60] shadow-zenith"
                                                    >
                                                        {filteredSuggestions.map((suggestion, index) => (
                                                            <button
                                                                key={suggestion}
                                                                className={`w-full px-8 py-4 text-left font-serif text-white/70 hover:text-white transition-all duration-300 flex items-center justify-between group/item ${index === selectedIndex ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}
                                                                onClick={() => handleSearch(suggestion)}
                                                                onMouseEnter={() => setSelectedIndex(index)}
                                                            >
                                                                <span>{suggestion}</span>
                                                                <ArrowRight size={14} className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Divider */}
                                        <div className="hidden md:block w-px bg-white/10 my-4" />

                                        {/* SECTION 2: Perpetual Archive */}
                                        <div className="flex flex-col justify-center px-8 border-l border-white/5">
                                            <span className="text-[10px] font-black text-gold-500/60 uppercase tracking-[0.4em] mb-2 leading-none">Chronology</span>
                                            <button
                                                onClick={() => navigate('/archive')}
                                                className="flex items-center space-x-3 text-white/60 hover:text-white transition-colors duration-500 group/link"
                                            >
                                                <Compass size={20} className="group-hover:link:rotate-90 transition-transform duration-1000" />
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Explore Archive</span>
                                            </button>
                                        </div>

                                        {/* SECTION 3: Primary CTA */}
                                        <button
                                            onClick={() => handleSearch()}
                                            className="bg-white text-forest-950 hover:bg-gold-500 hover:text-white px-10 py-5 md:py-0 rounded-sm font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-700 flex items-center justify-center space-x-3 shadow-premium hover:shadow-gold-500/20"
                                        >
                                            <span>Consult</span>
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 5, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
