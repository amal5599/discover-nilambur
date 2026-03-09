import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="bg-forest-950 min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2400"
                    className="w-full h-full object-cover opacity-20 grayscale"
                    alt="Nilambur Mist"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-transparent to-forest-950" />
                {/* Archival Scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,38,32,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-10" />
            </div>

            <div className="relative z-10 text-center space-y-16 px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                    className="space-y-10"
                >
                    <div className="flex justify-center mb-16">
                        <div className="p-12 bg-white/5 backdrop-blur-3xl rounded-sm border border-white/10 text-gold-500 shadow-premium group relative">
                            <Compass size={80} strokeWidth={0.5} className="transition-all duration-[3s] group-hover:rotate-[360deg] animate-pulse" />
                            <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-[80px] scale-0 group-hover:scale-100 transition-transform duration-1000" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <span className="hero-subtitle-refined">Registry Disruption</span>
                        <h1 className="hero-title text-white italic tracking-tighter leading-none">
                            Sector <span className="text-gold-500 font-light">Inaccessible</span>
                        </h1>
                    </div>

                    <p className="text-white/95 text-[18px] md:text-[20px] font-serif italic max-w-2xl mx-auto italic-shadow leading-relaxed">
                        "The requested spatial coordinates are unrecognized by the Nilambur Preservation Bureau. Return to the core vault to re-establish connectivity."
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col md:flex-row items-center justify-center gap-12"
                >
                    <Link to="/" className="bg-gold-600 hover:bg-white text-forest-950 py-6 px-16 text-[10px] font-black uppercase tracking-[0.5em] transition-premium flex items-center justify-center space-x-6 rounded-sm shadow-premium hover-lift">
                        <span>Return to Core Sanctuary</span>
                        <MoveRight size={14} strokeWidth={1} />
                    </Link>
                    <Link to="/explore" className="text-[10px] font-black uppercase tracking-[0.5em] text-white/70 hover:text-gold-500 transition-all duration-700 border-b border-white/20 hover:border-gold-500/50 pb-4 italic">
                        Consult the Intelligence Vault
                    </Link>
                </motion.div>
            </div>

            {/* Elite Metadata Overlay */}
            <div className="absolute bottom-16 left-16">
                <p className="text-[8px] font-black uppercase tracking-[0.6em] text-white/40 italic">Error Protocol 404 // Nilambur Preservation Registry // Strategic Override</p>
            </div>
        </div>
    );
};

export default NotFound;
