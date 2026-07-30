import { useEffect, useState } from "react";
import { getTeam } from "../api/team";

export function useTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getTeam()
      .then((res) => {
        if (!cancelled) setMembers(res.data || []);
      })
      .catch(() => {
        if (!cancelled) setMembers([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { members, loading };
}
