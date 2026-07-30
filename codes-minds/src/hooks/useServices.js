import { useEffect, useState } from "react";
import { getServices } from "../api/services";
import { mergeServiceContent, staticServices } from "../data/services";

// Fetches live services from the API and merges them with the static rich
// content (offerings, stats, tools, etc). Falls back to the static list if
// the backend is unreachable so the public site never breaks.
export function useServices() {
  const [services, setServices] = useState(staticServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getServices()
      .then((res) => {
        if (cancelled) return;
        setServices(mergeServiceContent(res.data));
      })
      .catch(() => {
        if (!cancelled) setServices(staticServices);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { services, loading };
}
