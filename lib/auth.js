import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) checkPaid(u);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) checkPaid(u);
      else { setIsPaid(false); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkPaid(u) {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("is_paid")
        .eq("id", u.id)
        .single();
      setIsPaid(data?.is_paid === true);
    } catch {
      setIsPaid(false);
    } finally {
      setLoading(false);
    }
  }

  return { user, isPaid, loading };
}
