import React, { useState } from 'react';
import { Search, Compass, Calendar, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        const params = new URLSearchParams();
        if (query.trim()) params.set('q', query.trim());
        navigate(`/explore?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-[1050px] mx-auto space-y-12">
            <div className="bg-white/12 backdrop-blur-3xl p-1.5 rounded-sm border border-white/20 shadow-premium flex flex-col lg:flex-row items-stretch gap-1.5 group/bar hover:bg-white/15 transition-premium overflow-hidden h-auto lg:h-[80px]">

                {/* Destination Section - Elite Focus */}
                <form
                    onSubmit={handleSearch}
                    className="flex-[1.4] flex items-center px-8 space-x-6 w-full group/input cursor-text relative overflow-hidden rounded-sm hover:bg-white/5 transition-premium h-full"
                >
                    <div className="p-3 bg-white/5 rounded-sm text-gold-500 group-hover/input:bg-gold-500 group-hover/input:text-forest-950 transition-premium shadow-premium border border-white/5 shrink-0 flex items-center justify-center">
                        <Compass size={20} strokeWidth={1} className="transition-transform duration-[1200ms] ease-inertia group-hover/input:rotate-[360deg]" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <p className="text-[8px] uppercase tracking-[0.5em] text-white/70 font-black mb-1.5 italic leading-none whitespace-nowrap">Asset Identification</p>
                        <input
                            type="text"
                            placeholder="Consult Preservation Record"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/30 font-serif font-medium text-lg lg:text-xl tracking-tight focus:ring-0 leading-none py-0 h-auto block mt-0.5"
                        />
                    </div>
                </form>

                <div className="hidden lg:block w-px h-auto bg-white/15 mx-2" />

                {/* Temporal Stratum Selection */}
                <div
                    onClick={() => navigate('/events')}
                    className="flex-1 flex items-center px-8 space-x-6 w-full group/input cursor-pointer relative overflow-hidden rounded-sm hover:bg-white/5 transition-premium h-full"
                >
                    <div className="p-3 bg-white/10 rounded-sm text-gold-500 group-hover/input:bg-gold-500 group-hover/input:text-forest-950 transition-premium shadow-premium border border-white/10 shrink-0 flex items-center justify-center">
                        <Calendar size={20} strokeWidth={1} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <p className="text-[8px] uppercase tracking-[0.5em] text-white/70 font-black mb-1.5 italic leading-none whitespace-nowrap">Temporal Stratum</p>
                        <span className="text-white font-serif font-medium text-lg lg:text-xl tracking-tight whitespace-nowrap leading-none block mt-0.5">Perpetual Archive</span>
                    </div>
                </div>

                {/* Cinematic Expansion Button */}
                <button
                    onClick={handleSearch}
                    className="w-full lg:w-auto px-12 bg-gold-500 text-forest-950 rounded-sm font-black text-[11px] uppercase tracking-[0.3em] transition-inertia flex items-center justify-center space-x-4 active:scale-[0.98] shrink-0 hover:bg-white border border-gold-400 group/btn h-full"
                >
                    <span className="leading-none block">Consult</span>
                    <MoveRight size={18} strokeWidth={2} className="group-hover:translate-x-2 transition-transform duration-700" />
                </button>
            </div>

            {/* Noble Intentions */}
            <div className="flex flex-wrap items-center justify-center gap-10">
                <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white/40 italic">Registry Shortcuts:</span>
                {['Teak Museum', 'Nedumkayam', 'Pottery Village', 'Bungalow Archive'].map((tag) => (
                    <button
                        key={tag}
                        onClick={() => navigate(`/explore?q=${encodeURIComponent(tag)}`)}
                        className="text-[9px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-gold-500 transition-premium border-b border-white/5 hover:border-gold-500/50 pb-1.5 flex items-center group italic"
                    >
                        {tag} <span className="opacity-0 group-hover:opacity-100 ml-3 transition-all duration-500 italic transform group-hover:translate-x-1">→</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
