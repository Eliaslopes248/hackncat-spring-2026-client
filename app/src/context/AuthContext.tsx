import { createContext, useContext, useState, type ReactNode } from "react";

const AUTH_STORAGE_KEY = "chevron-admin-session";
const ADMIN_USERNAME = "chevron_admin";
const ADMIN_PASSWORD = "chevron123";

type AuthSession = {
  username: string;
  signedInAt: string;
};

type AuthContextValue = {
  username: string | null;
  signIn: (username: string, password: string) => boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const DEMO_ADMIN_CREDENTIALS = {
  username: ADMIN_USERNAME,
  password: ADMIN_PASSWORD,
};

function readStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const storedSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedSession) return null;

  try {
    const parsedSession = JSON.parse(storedSession) as Partial<AuthSession>;

    if (parsedSession.username !== ADMIN_USERNAME || !parsedSession.signedInAt) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return {
      username: parsedSession.username,
      signedInAt: parsedSession.signedInAt,
    };
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readStoredSession());

  const signIn = (username: string, password: string) => {
    if (username.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return false;
    }

    const nextSession: AuthSession = {
      username: ADMIN_USERNAME,
      signedInAt: new Date().toISOString(),
    };

    setSession(nextSession);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
    return true;
  };

  const signOut = () => {
    setSession(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        username: session?.username ?? null,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
