import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, MoveRight } from 'lucide-react';
import guides from '../data/guides.json';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const Guides = () => {
    return (
        <div className="min-h-screen bg-cream-50 pt-32 pb-24">
            <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                <header className="mb-24 space-y-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <div className="h-px w-20 bg-gold-400/30" />
                            <span className="hero-subtitle-refined">Editorial Chronicles</span>
                        </div>
                        <div className="hidden lg:block">
                            <div className="space-y-1 opacity-40 text-right">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest-950">DOCUMENTARY INDEX</span>
                                <p className="text-[8px] font-mono text-gold-600 tracking-[0.2em]">DEPT. CULTURAL DOCUMENTATION</p>
                            </div>
                        </div>
                    </div>

                    <h1 className="hero-title italic text-forest-950 leading-none">
                        Editorial <br /><span className="text-forest-200">Narrative Anthology</span>
                    </h1>
                    <p className="text-forest-700 text-2xl font-serif italic max-w-3xl italic-shadow leading-relaxed">
                        "Deeply researched, intentionally documented, and engineered for the discerning observer."
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {guides.map((guide, index) => (
                        <motion.div
                            key={guide.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="group h-full"
                        >
                            <div className="bg-white rounded-sm border border-forest-950/5 shadow-premium overflow-hidden h-full flex flex-col hover:shadow-hover transition-all duration-1000 relative">
                                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={guide.image}
                                        alt={guide.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-[3s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                                    />
                                    {/* Archival Scanlines */}
                                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000 bg-[linear-gradient(rgba(18,38,32,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-10" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
                                    <div className="absolute bottom-10 left-10">
                                        <div className="px-6 py-3 glass-premium border border-white/10 rounded-sm text-[8px] font-black uppercase tracking-[0.4em] text-white shadow-premium">
                                            {guide.category}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-16 flex-1 flex flex-col justify-between space-y-12">
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-3 text-forest-500">
                                                <Clock size={12} strokeWidth={2} />
                                                <span className="text-[8px] font-black uppercase tracking-[0.5em]">{guide.readTime}</span>
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-gold-400" />
                                            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-gold-700 italic">Documentary</span>
                                        </div>
                                        <h3 className="section-title text-forest-950 italic group-hover:text-gold-600 transition-colors duration-700">
                                            {guide.title}
                                        </h3>
                                        <p className="body-elite text-xl text-forest-700 font-serif italic leading-relaxed italic-shadow">
                                            "{guide.description}"
                                        </p>
                                    </div>
                                    <button className="w-full bg-forest-950 hover:bg-gold-500 text-white hover:text-forest-950 py-6 px-10 text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-1000 flex items-center justify-center space-x-6 rounded-sm shadow-premium group/btn">
                                        <span>Read Full Chronicle</span>
                                        <MoveRight size={16} strokeWidth={1} className="transition-transform group-hover/btn:translate-x-2" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Guides;
