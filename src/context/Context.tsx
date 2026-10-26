import { useContext, createContext } from "react";
import type { ReactNode } from "react";
export const Context = createContext({ url: "http://api.zinnyi.site" });
export function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <Context.Provider value={{ url: "http://api.zinnyi.site" }}>
      {children}
    </Context.Provider>
  );
}
export function usingContext() {
  return useContext(Context);
}
