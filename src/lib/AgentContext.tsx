"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AgentContextType {
    isAgent: boolean;
    subscribe: () => void;
    unsubscribe: () => void;
}

const AgentContext = createContext<AgentContextType>({
    isAgent: false,
    subscribe: () => { },
    unsubscribe: () => { },
});

export function AgentProvider({ children }: { children: ReactNode }) {
    const [isAgent, setIsAgent] = useState(false);

    useEffect(() => {
        try {
            setIsAgent(localStorage.getItem("nestwell_is_agent") === "true");
        } catch { }
    }, []);

    const subscribe = () => {
        setIsAgent(true);
        localStorage.setItem("nestwell_is_agent", "true");
    };

    const unsubscribe = () => {
        setIsAgent(false);
        localStorage.removeItem("nestwell_is_agent");
    };

    return (
        <AgentContext.Provider value={{ isAgent, subscribe, unsubscribe }}>
            {children}
        </AgentContext.Provider>
    );
}

export const useAgent = () => useContext(AgentContext);
