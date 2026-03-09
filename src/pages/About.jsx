import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const About = () => {
    return (
        <div className="min-h-screen bg-cream-50">
            {/* Cinematic Hero */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-forest-950">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-50"
                        alt="Nilambur Teak Forest"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-forest-950/20 via-transparent to-forest-950/60" />
                </motion.div>

                <div className="relative z-10 text-center px-8 md:px-12 max-w-[1600px] mx-auto space-y-16">
                    <div className="space-y-8">
                        <span className="hero-subtitle-refined animate-in fade-in slide-in-from-bottom-4 duration-700 tracking-[0.5em]">Authentic Origin</span>
                        <h1 className="hero-title text-white italic tracking-tighter leading-[1.12]">
                            The Universal <br /><span className="text-gold-500 font-light italic-shadow glow-gold">Narrative Archive</span>
                        </h1>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                        <div className="h-px w-24 bg-gold-500/30 mx-auto" />
                        <p className="body-elite text-[18px] md:text-[22px] text-white/95 font-serif italic italic-shadow leading-relaxed">
                            "A world-class digital sanctuary engineered to preserve the rhythmic beauty and authoritative history of the teak capital."
                        </p>
                    </div>
                </div>

                {/* Heritage Context Metadata */}
                <div className="absolute top-12 left-12 z-20 hidden lg:block">
                    <div className="space-y-1 opacity-40">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Authentic ORIGIN</span>
                        <p className="text-[8px] font-mono text-gold-500 tracking-[0.2em]">DEPT. HISTORICAL PRESERVATION</p>
                    </div>
                </div>

                {/* Vertical Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 font-black">Discover Below</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gold-600 to-transparent" />
                </div>
            </section>

            <section className="py-24 max-w-[1600px] mx-auto px-8 md:px-12 space-y-32">
                <div className="text-center space-y-10 mb-32">
                    <span className="caption-elite text-gold-600">The Scripted Narrative</span>
                    <h2 className="section-title italic text-forest-950 leading-none">Curated <span className="text-forest-200">Discovery Paths</span></h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative">
                    {/* Archival Split Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/20 via-gold-400/5 to-transparent hidden lg:block" />

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="space-y-12 pr-12"
                    >
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-600 italic">Chapter I</span>
                            <div className="h-px flex-1 bg-forest-950/5" />
                        </div>
                        <p className="body-elite text-[24px] md:text-[28px] text-forest-950 font-serif italic leading-relaxed italic-shadow">
                            "This ecosystem was engineered to solve the complexity of urban discovery while maintaining the calm, rhythmic soul of Nilambur. We believe that information must be as beautiful as the landscapes it catalogs."
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-12 pl-12 pt-24 lg:pt-48"
                    >
                        <div className="flex items-center gap-6">
                            <div className="h-px flex-1 bg-forest-950/5" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-600 italic">Chapter II</span>
                        </div>
                        <p className="body-elite text-[20px] text-forest-700 font-serif italic leading-relaxed italic-shadow">
                            "From the world's oldest teak plantation to the hidden coordinates of the Western Ghats, our mission is to maintain the definitive digital record for the global observer."
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-24 pt-48 border-t border-forest-950/10">
                    {[
                        { label: "Authentic Foundation", value: "MMXXI" },
                        { label: "Site Anthology", value: "240+" },
                        { label: "Global Resonance", value: "85K+" }
                    ].map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 1.2 }}
                            viewport={{ once: true }}
                            className="group space-y-8"
                        >
                            <div className="text-7xl lg:text-8xl font-serif font-black text-forest-200 group-hover:text-gold-500 transition-all duration-[1.5s] italic drop-shadow-sm">{stat.value}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-forest-400 font-extrabold italic group-hover:text-forest-950 transition-colors">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
