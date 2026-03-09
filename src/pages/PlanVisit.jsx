import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, Shield, Sun, Globe } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const PlanVisit = () => {
    const sections = [
        {
            title: "Infrastructural Access",
            icon: MapPin,
            content: "Nilambur is well-connected by rail and road. The town is best explored via local taxis or private transport assets. The nearest airport is Calicut International (CCJ), approximately 45km away."
        },
        {
            title: "Temporal Window Analysis",
            icon: Sun,
            content: "September to March offers the most pleasant climate. The monsoon (June-August) is breathtaking for nature enthusiasts but may restrict forest access protocols."
        },
        {
            title: "Safety & Security Protocol",
            icon: Shield,
            content: "Nilambur maintains a high safety index. When exploring restricted archives or forests, certified guides are mandatory. Emergency: 100 (Police), 101 (Fire)."
        },
        {
            title: "Sociocultural Resonance",
            icon: Globe,
            content: "Respect for local heritage is paramount. Traditional attire is recommended for sacred sites. Malayalam is the primary dialect, with English widely utilized in curated zones."
        }
    ];

    return (
        <div className="min-h-screen bg-cream-50 pt-32 pb-24">
            <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                <header className="mb-24 text-center space-y-10">
                    <div className="flex items-center justify-center space-x-8">
                        <div className="h-px w-20 bg-gold-400/30" />
                        <span className="hero-subtitle-refined">Strategic Logistics</span>
                        <div className="h-px w-20 bg-gold-400/30" />
                    </div>
                    <h1 className="hero-title italic text-forest-950 leading-none">
                        Planning <span className="text-forest-200">Protocols</span>
                    </h1>
                    <p className="body-elite text-forest-700 text-2xl font-serif italic max-w-3xl mx-auto italic-shadow leading-relaxed">
                        "A documentation of essential logistics, cultural etiquette, and clinical safety protocols for a refined Nilambur experience."
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group h-full"
                        >
                            <div className="bg-white p-14 rounded-sm border border-forest-950/5 shadow-premium h-full flex flex-col gap-12 group relative overflow-hidden">
                                {/* Archival Grid Background */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[linear-gradient(90deg,rgba(18,38,32,0.1)_1px,transparent_1px),linear-gradient(rgba(18,38,32,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

                                {/* Archival Scanlines */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,38,32,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />

                                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />

                                <div className="w-20 h-20 bg-forest-950 text-gold-500 rounded-sm flex items-center justify-center shadow-premium transition-all duration-1000 group-hover:rotate-[360deg] group-hover:bg-gold-600 group-hover:text-forest-950 relative z-20">
                                    <section.icon size={32} strokeWidth={1} />
                                </div>
                                <div className="space-y-6 relative z-20">
                                    <h3 className="section-title text-forest-950 italic group-hover:text-gold-600 transition-colors duration-700">
                                        {section.title}
                                    </h3>
                                    <p className="body-elite text-xl text-forest-700 font-serif italic leading-relaxed italic-shadow">
                                        "{section.content}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlanVisit;
