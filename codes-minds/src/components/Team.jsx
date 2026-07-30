import { useTeam } from "../hooks/useTeam";
import { resolveImage } from "../api/config";
import "./Team.css";

/**
 * Renders team members managed from the admin panel. Pass `members` to
 * override with a specific list; otherwise it fetches live members from
 * the API.
 */
function Team({ members }) {
  const { members: liveMembers, loading } = useTeam();
  const list = members || liveMembers;

  if (!members && loading) return null;

  return (
    <div className="team team--grid">
      {list.map((member) => (
        <div key={member._id || member.name} className="team-card">
          <div className="team-card__photo">
            <img
              src={member.image ? resolveImage(member.image) : member.photo}
              alt={member.name}
            />
          </div>
          <h4 className="team-card__name">{member.name}</h4>
          <span className="team-card__role">{member.role}</span>
        </div>
      ))}
    </div>
  );
}

export default Team;
