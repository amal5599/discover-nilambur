import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Tag, MoveRight, Sparkles } from 'lucide-react';
import events from '../data/events.json';

const EventsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-cream-50 min-h-screen">
            {/* Cinematic Header */}
            <section className="relative h-[80vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-forest-950">
                <div className="absolute inset-0">
                    <motion.img
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                        src="https://images.unsplash.com/photo-1590059536098-9008233a7f80?auto=format&fit=crop&q=80&w=2400"
                        className="w-full h-full object-cover"
                        alt="Cultural Events"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/20 to-transparent" />
                </div>

                <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10 text-center space-y-20">
                    <div className="space-y-8">
                        <span className="hero-subtitle-refined tracking-[0.5em]">Temporal Registry</span>
                        <h1 className="hero-title text-white italic tracking-tighter leading-[1.15]">
                            Tactical <br /><span className="text-gold-500 font-light italic-shadow glow-gold italic">Heritage Timeline</span>
                        </h1>
                    </div>
                    <p className="body-elite text-[18px] md:text-[22px] text-white/95 max-w-3xl mx-auto font-serif italic italic-shadow leading-relaxed">
                        "A clinical documentation of the vibrant heritage and timeless traditions within the Nilambur ecosystem."
                    </p>
                </div>

                {/* Tactical Registry Metadata */}
                <div className="absolute top-12 right-12 z-20 hidden lg:block text-right">
                    <div className="space-y-1 opacity-40">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Registry Stratum</span>
                        <p className="text-[8px] font-mono text-gold-500 tracking-[0.2em]">TEMPORAL LOGISTICS [V2]</p>
                    </div>
                </div>

                {/* Vertical Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 font-black">Discover More</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gold-600 to-transparent" />
                </div>
            </section>

            {/* Events Grid with Timeline Feel */}
            <section className="max-w-[1600px] mx-auto px-8 md:px-12 py-24 relative">
                {/* Elite Timeline Line */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-px h-[calc(100%-200px)] bg-gradient-to-b from-gold-400/30 via-gold-400/5 to-transparent hidden lg:block" />

                <div className="space-y-40">
                    {events.map((event, idx) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-24 lg:gap-40`}
                        >
                            {/* Visual Side */}
                            <div className="w-full lg:w-1/2 relative group">
                                <div className="absolute -inset-16 bg-forest-900/[0.01] rounded-full blur-3xl group-hover:bg-gold-500/[0.03] transition-premium duration-1000" />
                                <div className="relative aspect-[16/10] rounded-sm overflow-hidden shadow-premium border border-forest-900/5">
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-[3s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                                    />
                                    {/* Archival Scanlines */}
                                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000 bg-[linear-gradient(rgba(18,38,32,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-10" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />

                                    <div className="absolute top-10 left-10">
                                        <div className="glass-premium px-6 py-3 rounded-sm text-[8px] font-black uppercase tracking-[0.4em] text-white border border-white/10 shadow-premium">
                                            {event.category}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 space-y-12 py-10">
                                <div className="flex items-center space-x-6">
                                    <div className="flex flex-col">
                                        <span className="text-gold-600 font-black uppercase tracking-[0.5em] text-[10px] mb-2 italic">Asset Date</span>
                                        <span className="text-forest-950 font-serif font-bold italic text-3xl tracking-tighter">
                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="h-px flex-1 bg-forest-950/10" />
                                </div>

                                <div className="space-y-8">
                                    <h2 className="section-title italic leading-[1.1]">
                                        {event.name}
                                    </h2>
                                    <p className="body-elite text-forest-900 text-xl leading-relaxed font-serif italic italic-shadow">
                                        "{event.description}"
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-forest-900/5">
                                    <div className="flex items-center text-forest-700 font-black text-[10px] uppercase tracking-[0.2em] group/loc">
                                        <div className="p-2 bg-forest-100 rounded-md mr-4 group-hover/loc:bg-gold-50 transition-premium shadow-soft">
                                            <MapPin size={16} className="text-gold-600" />
                                        </div>
                                        <span className="text-forest-600 group-hover/loc:text-forest-950 transition-colors uppercase italic font-black">{event.location}</span>
                                    </div>
                                    <button className="flex items-center space-x-4 text-forest-950 font-bold text-[11px] uppercase tracking-[0.2em] group transition-premium hover:text-gold-600">
                                        <span className="border-b border-transparent group-hover:border-gold-500 pb-1">Execute Deep Dive</span>
                                        <MoveRight size={18} className="transition-transform group-hover:translate-x-2 duration-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Premium CTA Section */}
            <section className="py-64 px-12 bg-cream-50">
                <div className="max-w-[1600px] mx-auto relative overflow-hidden bg-forest-950 p-24 md:p-48 rounded-sm shadow-premium group border border-white/5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] -mr-32 -mt-32 group-hover:bg-gold-500/10 transition-colors duration-[3s]" />

                    <div className="relative z-10 text-center max-w-4xl mx-auto space-y-16">
                        <div className="space-y-10">
                            <div className="p-6 bg-white/5 w-fit mx-auto rounded-sm backdrop-blur-md border border-white/10 mb-12 group-hover:border-gold-500/30 transition-colors">
                                <Sparkles size={32} strokeWidth={1} className="text-gold-400" />
                            </div>
                            <span className="caption-elite text-gold-500">Institutional Engagement</span>
                            <h2 className="hero-title text-white italic tracking-tighter">Cultivate Your <br /><span className="text-gold-500 font-light italic-shadow glow-gold">Heritage Presence</span></h2>
                        </div>
                        <p className="text-white/80 text-2xl leading-relaxed font-serif italic italic-shadow max-w-3xl mx-auto">
                            "Partner with the Nilambur Preservation Archive to showcase local workshops, grand festivals, or intimate community gatherings on a global stage."
                        </p>
                        <div className="pt-12">
                            <button className="px-16 py-7 bg-gold-500 text-forest-950 rounded-sm font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white transition-all duration-1000 shadow-premium transform hover:-translate-y-1 inline-flex items-center group/btn">
                                <span>Initiate Partnership Protocol</span>
                                <MoveRight size={18} strokeWidth={1} className="ml-6 transition-transform group-hover/btn:translate-x-4 duration-700" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventsPage;
