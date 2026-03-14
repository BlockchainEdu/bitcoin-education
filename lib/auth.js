import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext({ user: null, member: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchMember(session.user.id);
      else setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchMember(session.user.id);
      } else {
        setMember(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchMember(userId) {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("id", userId)
      .single();
    setMember(data);
    setLoading(false);
  }

  async function signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error };

    // Create member row
    if (data.user) {
      await supabase.from("members").insert({
        id: data.user.id,
        email,
        name: name || "",
        role: "free",
        is_paid: false,
      });
    }
    return { data };
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  }

  async function signInWithGoogle() {
    const returnTo = encodeURIComponent(window.location.pathname + window.location.search);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${returnTo}`,
      },
    });
    return { data, error };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setMember(null);
  }

  const isPaid = member?.is_paid === true;

  return (
    <AuthContext.Provider value={{
      user,
      member,
      loading,
      isPaid,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
