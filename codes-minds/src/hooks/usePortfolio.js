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
        if (cancelled) return;

        // API returns { success, count, data }. Keep compatibility with
        // direct-array responses as well.
        const projects = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];

        setProjects(projects);
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
