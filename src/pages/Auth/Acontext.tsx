import { createContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { usingContext } from "../../context/Context";
interface AuthUser {
  [key: string]: string;
}
interface AuthContextType {
  auth: AuthUser | null;
  fetchuser: () => Promise<boolean>;
  logout: () => Promise<void>;
}
export const Acontext = createContext<AuthContextType | undefined>(undefined);
async function loadUser(url: string): Promise<AuthUser | null> {
  const response = await fetch(`${url}/api/admin/info`, {
    credentials: "include",
  });
  if (!response.ok)
    throw new Error("Unable to load your account. Please try again.");
  const data = await response.json();
  return data.success ? data.user : null;
}
export function Aprovider({ children }: { children: ReactNode }) {
  const { url } = usingContext();
  const [auth, setAuth] = useState<AuthUser | null>(null);
  const fetchuser = useCallback(async (): Promise<boolean> => {
    const user = await loadUser(url);
    setAuth(user);
    return Boolean(user);
  }, [url]);
  const logout = async () => {
    const response = await fetch(`${url}/api/admin/logout`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Unable to sign out.");
    const data = await response.json();
    if (!data.success) throw new Error("Unable to sign out.");
    setAuth(null);
  };
  useEffect(() => {
    let active = true;
    void loadUser(url)
      .then((user) => {
        if (active) setAuth(user);
      })
      .catch(() => {
        if (active) setAuth(null);
      });
    return () => {
      active = false;
    };
  }, [url]);
  return (
    <Acontext.Provider value={{ fetchuser, auth, logout }}>
      {children}
    </Acontext.Provider>
  );
}
