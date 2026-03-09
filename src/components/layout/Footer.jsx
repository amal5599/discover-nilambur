import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight, ShieldCheck, Globe, Info } from 'lucide-react';
import categories from '../../data/categories.json';

const Footer = () => {
    return (
        <footer className="bg-forest-950 text-white pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
            {/* Elite Subtle Decoration */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[200px] -mr-96 -mt-96 pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
                    {/* Brand Section - Elite Presence */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-serif font-black text-white tracking-tight leading-tight uppercase">
                                Discover <span className="text-gold-500 font-light">Nilambur</span>
                            </h3>
                            <p className="text-forest-100/70 leading-relaxed text-[17px] font-serif italic max-w-sm">
                                "The definitive narrative archive of the global teak capital. Engineered for the discerning observer."
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="group transition-premium">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-white/5 border border-white/5 group-hover:border-gold-500/50 group-hover:bg-gold-500 group-hover:text-forest-950 transition-premium shadow-premium">
                                        <Icon size={18} strokeWidth={1.5} />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 1: Taxonomic Index */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-500 mb-10">Legacy Index</h4>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-forest-100/70 text-[10px] font-black uppercase tracking-[0.2em]">
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <Link to={`/${cat.slug}`} className="hover:text-gold-500 transition-premium block hover:translate-x-1">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Strategic Protocols */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-500 mb-10">Chronicles</h4>
                        <ul className="space-y-4 text-forest-100/70 text-[10px] font-black uppercase tracking-[0.2em]">
                            <li><Link to="/guides" className="hover:text-gold-500 transition-premium block hover:translate-x-1">Editorial Archive</Link></li>
                            <li><Link to="/plan-your-visit" className="hover:text-gold-500 transition-premium block hover:translate-x-1">Visitor Details</Link></li>
                            <li><Link to="/about" className="hover:text-gold-500 transition-premium block hover:translate-x-1">Heritage Record</Link></li>
                            <li><Link to="/events" className="hover:text-gold-500 transition-premium block hover:translate-x-1">Temporal Timeline</Link></li>
                            <li><Link to="/explore" className="hover:text-gold-500 transition-premium block hover:translate-x-1">Collective Record</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Bureau Headquarters */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-gold-500 mb-10">Heritage Bureau</h4>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-5 group">
                                <div className="p-4 bg-white/5 rounded-sm text-gold-500 group-hover:bg-gold-500 group-hover:text-forest-950 transition-premium shadow-premium border border-white/5">
                                    <MapPin size={18} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-serif italic text-lg text-forest-100/80 leading-relaxed">Nilambur Heritage Bureau,<br />Main Historical Road, IX - 679329</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-5 group">
                                <div className="p-4 bg-white/5 rounded-sm text-gold-500 group-hover:bg-gold-500 group-hover:text-forest-950 transition-premium shadow-premium border border-white/5">
                                    <Mail size={18} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-serif italic text-lg text-forest-100/80">contact@nilamburarchive.so</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Elite Metadata */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[9px] uppercase tracking-[0.4em] text-forest-600 font-black">
                    <p className="opacity-70 text-center md:text-left">© 2026 Nilambur Heritage Bureau. Documentary Standard Platform // Archive V.2.0</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-12 gap-y-4">
                        <Link to="/about" className="hover:text-gold-500 transition-colors border-b border-transparent hover:border-gold-500/30 pb-0.5">Legal Disclosure</Link>
                        <Link to="/plan-your-visit" className="hover:text-gold-500 transition-colors border-b border-transparent hover:border-gold-500/30 pb-0.5">Visitor Guidelines</Link>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-white hover:text-gold-500 transition-premium flex items-center gap-4 group px-4 py-2 bg-white/5 rounded-sm border border-white/5 hover:border-gold-500/30"
                        >
                            <span className="font-black">Return to Zenith</span>
                            <ArrowUpRight size={14} className="text-gold-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-700" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
