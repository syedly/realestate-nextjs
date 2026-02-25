"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface SavedProperty {
    id: string;
    title: string;
    price: string;
    address: string;
    city: string;
    type: string;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
}

interface SavedContextType {
    saved: SavedProperty[];
    isSaved: (id: string) => boolean;
    toggleSaved: (property: SavedProperty) => void;
}

const SavedContext = createContext<SavedContextType>({
    saved: [],
    isSaved: () => false,
    toggleSaved: () => { },
});

export function SavedProvider({ children }: { children: ReactNode }) {
    const [saved, setSaved] = useState<SavedProperty[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem("nestwell_saved");
            if (stored) setSaved(JSON.parse(stored));
        } catch { }
    }, []);

    // Persist to localStorage whenever saved changes
    useEffect(() => {
        localStorage.setItem("nestwell_saved", JSON.stringify(saved));
    }, [saved]);

    const isSaved = (id: string) => saved.some((p) => p.id === id);

    const toggleSaved = (property: SavedProperty) => {
        setSaved((prev) =>
            prev.some((p) => p.id === property.id)
                ? prev.filter((p) => p.id !== property.id)
                : [...prev, property]
        );
    };

    return (
        <SavedContext.Provider value={{ saved, isSaved, toggleSaved }}>
            {children}
        </SavedContext.Provider>
    );
}

export const useSaved = () => useContext(SavedContext);
