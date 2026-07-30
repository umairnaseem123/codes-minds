import { useEffect, useState } from "react";
import { getPortfolio } from "../api/portfolio";

export function usePortfolio(serviceId) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getPortfolio(serviceId)
      .then((res) => {
        if (!cancelled) setProjects(res.data || []);
      })
      .catch(() => {
        if (!cancelled) setProjects([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [serviceId]);

  return { projects, loading };
}
