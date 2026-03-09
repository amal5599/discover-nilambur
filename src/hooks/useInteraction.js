import { useState, useEffect, useCallback } from 'react';

export const useInteraction = () => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('nilambur_wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('nilambur_history');
        return saved ? JSON.parse(saved) : [];
    });

    const [compareList, setCompareList] = useState([]);

    useEffect(() => {
        localStorage.setItem('nilambur_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('nilambur_history', JSON.stringify(history));
    }, [history]);

    const toggleWishlist = useCallback((placeId) => {
        setWishlist(prev =>
            prev.includes(placeId)
                ? prev.filter(id => id !== placeId)
                : [...prev, placeId]
        );
    }, []);

    const addToHistory = useCallback((placeId) => {
        setHistory(prev => {
            const lowHistory = prev.filter(id => id !== placeId);
            return [placeId, ...lowHistory].slice(0, 10);
        });
    }, []);

    const toggleCompare = useCallback((placeId) => {
        setCompareList(prev => {
            if (prev.includes(placeId)) return prev.filter(id => id !== placeId);
            if (prev.length >= 3) return prev; // Limit to 3 for clean visual layout
            return [...prev, placeId];
        });
    }, []);

    const clearCompare = useCallback(() => setCompareList([]), []);

    const clearHistory = useCallback(() => setHistory([]), []);

    return {
        wishlist,
        toggleWishlist,
        history,
        addToHistory,
        clearHistory,
        compareList,
        toggleCompare,
        clearCompare
    };
};
