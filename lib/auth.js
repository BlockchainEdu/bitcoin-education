import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ user: null, member: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [member, setMember] = useState(null);
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

  async function signUp(email, password, name) {
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

  async function signIn(email, password) {
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

  async function signInWithGoogle() {
    const returnTo = encodeURIComponent(
      window.location.pathname + window.location.search
    );
    window.location.href = `/api/auth/google?next=${returnTo}`;
    return { data: {} };
  }

  async function signOut() {
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
