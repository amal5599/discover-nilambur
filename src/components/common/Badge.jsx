import React from 'react';

const Badge = ({
    children,
    variant = 'neutral',
    className = ''
}) => {
    const variants = {
        neutral: "bg-forest-50 text-forest-600 border-forest-100",
        primary: "bg-forest-950 text-white border-forest-950",
        success: "bg-success-50 text-success-700 border-success-100",
        warning: "bg-warning-50 text-warning-700 border-warning-100",
        gold: "bg-gold-50 text-gold-700 border-gold-100"
    };

    return (
        <span className={`inline-flex items-center px-5 py-2 rounded-sm text-[8px] font-black uppercase tracking-[0.4em] border shadow-soft ${variants[variant]} ${className} italic`}>
            {children}
        </span>
    );
};

export default Badge;
