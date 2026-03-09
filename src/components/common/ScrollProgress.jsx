import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gold-500 origin-left z-[9999] shadow-[0_0_10px_rgba(184,134,59,0.5)]"
            style={{ scaleX }}
        >
            <div className="absolute top-0 right-0 w-4 h-full bg-white animate-pulse blur-[2px] opacity-60" />
        </motion.div>
    );
};

export default ScrollProgress;
