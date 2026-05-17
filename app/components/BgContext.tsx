"use client";

import { createContext, useContext, useState } from "react";

interface BgContextValue {
  active: string;
  setActive: (id: string) => void;
}

const BgContext = createContext<BgContextValue>({
  active: "hero",
  setActive: () => {},
});

export function BgProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("hero");
  return (
    <BgContext.Provider value={{ active, setActive }}>
      {children}
    </BgContext.Provider>
  );
}

export function useBg() {
  return useContext(BgContext);
}
