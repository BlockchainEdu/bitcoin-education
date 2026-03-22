import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthUser {
  id: string;
  email: string;
}

interface AuthMember {
  id: string;
  email: string;
  name: string;
  role: string;
  is_paid: boolean;
  stripe_customer_id: string | null;
  paid_at: string | null;
}

interface AuthResult {
  data?: any;
  error?: { message: string };
}

interface AuthContextValue {
  user: AuthUser | null;
  member: AuthMember | null;
  loading: boolean;
  isPaid: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  member: null,
  loading: true,
  isPaid: false,
  signUp: async () => ({}),
  signIn: async () => ({}),
  signInWithGoogle: async () => ({}),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [member, setMember] = useState<AuthMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe();
  }, []);

  async function fetchMe() {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUser(data.user);
      setMember(data.member);
    } catch {
      setUser(null);
      setMember(null);
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string, name?: string): Promise<AuthResult> {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    if (!res.ok) return { error: { message: data.error } };
    await fetchMe();
    return { data };
  }

  async function signIn(email: string, password: string): Promise<AuthResult> {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { error: { message: data.error } };
    await fetchMe();
    return { data };
  }

  async function signInWithGoogle(): Promise<AuthResult> {
    const returnTo = encodeURIComponent(
      window.location.pathname + window.location.search
    );
    window.location.href = `/api/auth/google?next=${returnTo}`;
    return { data: {} };
  }

  async function signOut(): Promise<void> {
    await fetch("/api/auth/signout", { method: "POST" });
    setUser(null);
    setMember(null);
  }

  const isPaid = member?.is_paid === true;

  return (
    <AuthContext.Provider
      value={{
        user,
        member,
        loading,
        isPaid,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
