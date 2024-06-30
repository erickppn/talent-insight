import { createContext, useEffect, useState } from "react";

export type SidebarContextType = {
  sidebarIsExpanded: boolean,
  toggleSidebarStatus: () => void,
}

export const SidebarContext = createContext<SidebarContextType>(null!);

export function SidebarProvider({ children }: { children: JSX.Element }) {
  const [sidebarIsExpanded, setIsSidebarActive] = useState(JSON.parse(localStorage.getItem("tl-sidebar") || "true"));

  function toggleSidebarStatus() {
    setIsSidebarActive(!sidebarIsExpanded);
  }

  useEffect(() => {
    localStorage.setItem("tl-sidebar", JSON.stringify(sidebarIsExpanded));
  }, [sidebarIsExpanded]);

  return (
    <SidebarContext.Provider 
      value={{
        sidebarIsExpanded,
        toggleSidebarStatus
      }}
    >
      { children }
    </SidebarContext.Provider>
  )
}