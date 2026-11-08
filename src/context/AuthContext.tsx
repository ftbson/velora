"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: CustomerUser | null;
  isLoading: boolean;
  refresh: () => Promise<CustomerUser | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_CHANGE_EVENT = "velora-auth-change";

export function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", { cache: "no-store" });
      if (!response.ok) throw new Error("Session client indisponible.");
      const data: unknown = await response.json();
      const nextUser =
        typeof data === "object" &&
        data !== null &&
        "user" in data &&
        typeof data.user === "object" &&
        data.user !== null &&
        "id" in data.user &&
        typeof data.user.id === "string" &&
        "name" in data.user &&
        typeof data.user.name === "string" &&
        "email" in data.user &&
        typeof data.user.email === "string"
          ? {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
            }
          : null;
      setUser(nextUser);
      return nextUser;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (!response.ok) throw new Error("Session client indisponible.");
        const data: unknown = await response.json();
        if (!active) return;

        if (
          typeof data === "object" &&
          data !== null &&
          "user" in data &&
          typeof data.user === "object" &&
          data.user !== null &&
          "id" in data.user &&
          typeof data.user.id === "string" &&
          "name" in data.user &&
          typeof data.user.name === "string" &&
          "email" in data.user &&
          typeof data.user.email === "string"
        ) {
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du compte client :", error);
        if (active) setUser(null);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void loadUser();
    window.addEventListener(AUTH_CHANGE_EVENT, loadUser);
    return () => {
      active = false;
      window.removeEventListener(AUTH_CHANGE_EVENT, loadUser);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider.");
  }
  return context;
}
