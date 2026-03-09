import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-[0.3em] transition-premium active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group/shimmer";

  const variants = {
    primary: "bg-forest-950 text-white hover:bg-forest-900 shadow-premium border border-white/5 group-hover:border-gold-500/50",
    secondary: "bg-white text-forest-950 border border-forest-950/5 hover:bg-forest-50 hover:shadow-premium",
    ghost: "text-forest-600 hover:text-forest-950 hover:bg-forest-50/20",
    outline: "bg-transparent text-forest-950 border border-forest-950 hover:bg-forest-950 hover:text-white shadow-soft"
  };

  const sizes = {
    sm: "px-6 py-2.5 text-[8px] rounded-sm",
    md: "px-10 py-4 text-[9px] rounded-sm",
    lg: "px-14 py-6 text-[11px] rounded-sm"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/shimmer:translate-x-full transition-transform duration-[1200ms] ease-out-expo" />
      {isLoading ? (
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Processing</span>
        </div>
      ) : (
        <div className="flex items-center gap-4 relative z-10">
          {children}
          {variant === 'primary' && <div className="w-1 h-1 rounded-full bg-gold-400 group-hover/shimmer:scale-150 transition-transform duration-500" />}
        </div>
      )}
    </button>
  );
};

export default Button;
