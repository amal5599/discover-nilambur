import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    hoverEffect = true,
    padding = 'p-6',
    ...props
}) => {
    return (
        <motion.div
            className={`bg-white rounded-md border border-forest-900/5 transition-premium ${hoverEffect ? 'hover:shadow-medium hover:-translate-y-1' : 'shadow-soft'} ${padding} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
