"use client";

import { useThemeStore } from "@/store";
import { ReactNode, useEffect, useState } from "react";

export default function Hydrate({ children }: { children: ReactNode }) {
  const themeStore = useThemeStore()
  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return <>{isHydrated ? <body className="px-4 lg:px-48" data-theme={themeStore.mode}>{children}</body> : <body></body>}</>;
}
