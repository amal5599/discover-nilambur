import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) setIsOpen(false);
        if (isSearchOpen) setIsSearchOpen(false);
    }, [location.pathname]);

    // Handle ESC key to close search
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const navTheme = isScrolled
        ? 'bg-forest-950/80 backdrop-blur-md py-4 border-b border-white/5'
        : 'bg-transparent py-6';

    const navLinks = [
        { name: 'Explore', path: '/explore' },
        { name: 'Archive', path: '/archive' },
        { name: 'Heritage', path: '/about' },
        { name: 'Guides', path: '/guides' },
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        const params = new URLSearchParams();
        params.set('q', searchQuery.trim());
        navigate(`/search?${params.toString()}`);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-out ${navTheme}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Left: Logo */}
                    <Link to="/" className="group" aria-label="Discover Nilambur Home">
                        <span className="text-xl md:text-2xl font-serif font-light tracking-[0.2em] text-white uppercase group-hover:text-gold-400 transition-colors duration-500">
                            Discover <span className="font-bold">Nilambur</span>
                        </span>
                    </Link>

                    {/* Center: Navigation */}
                    <div className="hidden lg:flex items-center space-x-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative group py-2"
                            >
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70 group-hover:text-white transition-colors duration-500">
                                    {link.name}
                                </span>
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-500 origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Right: Actions */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-white/70 hover:text-white transition-colors duration-500 group focus:outline-none"
                            aria-label="Open Search"
                        >
                            <Search size={18} className="group-hover:scale-110 transition-transform duration-500" />
                        </button>
                        <Link
                            to="/plan-your-visit"
                            className="px-8 py-3 bg-white hover:bg-gold-500 text-forest-950 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 shadow-premium hover:shadow-gold-500/40 active:scale-95 border border-transparent"
                        >
                            Inquiry
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-white p-2"
                            aria-label="Open Search"
                        >
                            <Search size={20} />
                        </button>
                        <button
                            className="text-white p-2"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Mobile Menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-0 bg-forest-950/98 backdrop-blur-3xl z-[101] lg:hidden flex flex-col p-8 pt-24"
                        >
                            <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
                                <span className="text-lg font-serif tracking-[0.3em] text-white uppercase font-black">
                                    Nilambur
                                </span>
                                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="flex flex-col space-y-6">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className="text-3xl font-serif text-white hover:text-gold-400 transition-colors flex items-center justify-between group"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span>{link.name}</span>
                                            <Search size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-gold-500" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-auto pt-12 border-t border-white/5">
                                <Link
                                    to="/plan-your-visit"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center py-5 bg-white text-forest-950 font-bold uppercase tracking-[0.3em] text-[11px] rounded-full hover:bg-gold-500 transition-colors"
                                >
                                    Inquiry protocol
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Global Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-forest-950/98 backdrop-blur-3xl flex flex-col items-center justify-center px-6"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors duration-500 group"
                        >
                            <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
                        </motion.button>

                        <div className="w-full max-w-4xl">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-12 text-center"
                            >
                                <span className="text-gold-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Searching The Legacy</span>
                                <h2 className="text-white text-4xl md:text-7xl font-serif leading-tight">What are you <br /><span className="italic-accent text-white/40">looking for?</span></h2>
                            </motion.div>

                            <motion.form
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                onSubmit={handleSearchSubmit}
                                className="relative group"
                            >
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Rainforests, Museums, Heritage..."
                                    className="w-full bg-transparent border-b border-white/20 focus:border-gold-500/50 py-8 text-2xl md:text-5xl text-white font-serif outline-none transition-all duration-700 placeholder:text-white/20 text-center"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-gold-400 transition-colors duration-500"
                                >
                                    <Search size={32} strokeWidth={1} />
                                </button>
                            </motion.form>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-16 flex flex-wrap justify-center gap-4"
                            >
                                <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] w-full text-center mb-4">Popular Consultations</span>
                                {['Teak Museum', 'Conolly Plot', 'Adyanpara', 'Nedumkayam'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            setSearchQuery(tag);
                                            const params = new URLSearchParams();
                                            params.set('q', tag);
                                            navigate(`/explore?${params.toString()}`);
                                            setIsSearchOpen(false);
                                            setSearchQuery('');
                                        }}
                                        className="px-6 py-3 rounded-full border border-white/10 hover:border-gold-500/50 bg-white/5 hover:bg-gold-500/10 text-white/50 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
