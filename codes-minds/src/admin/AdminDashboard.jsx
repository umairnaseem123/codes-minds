import { useEffect, useState } from "react";
import { Layers, FolderKanban, Users, MessageSquare } from "lucide-react";
import { getServices } from "../api/services";
import { getPortfolio } from "../api/portfolio";
import { getTeam } from "../api/team";
import { getContacts } from "../api/contact";
import "./admin.css";

function AdminDashboard() {
  const [counts, setCounts] = useState({
    services: 0,
    portfolio: 0,
    team: 0,
    unread: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getServices(), getPortfolio(), getTeam(), getContacts("unread")])
      .then(([services, portfolio, team, unread]) => {
        setCounts({
          services: services.count ?? services.data.length,
          portfolio: portfolio.count ?? portfolio.data.length,
          team: team.count ?? team.data.length,
          unread: unread.count ?? unread.data.length,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Services", value: counts.services, icon: Layers },
    { label: "Portfolio Projects", value: counts.portfolio, icon: FolderKanban },
    { label: "Team Members", value: counts.team, icon: Users },
    { label: "Unread Messages", value: counts.unread, icon: MessageSquare },
  ];

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your site content.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="admin-stat-card">
            <Icon size={20} color="var(--color-violet)" />
            <div className="admin-stat-card__value">{loading ? "…" : value}</div>
            <div className="admin-stat-card__label">{label}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
