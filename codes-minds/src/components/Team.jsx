import { Code2, Sparkles } from "lucide-react";
import "./Team.css";

export const teamMembers = [
  {
    name: "Umair",
    role: "Co-Founder & Full Stack Web Developer",
    photo: "/team/umair.jpg",
  },
  {
    name: "Anoosha",
    role: "Co-Founder & Full Stack Web Developer",
    photo: "/team/anoosha.jpg",
  },
];

/**
 * variant="strip"   -> compact side-by-side row, used on the Home page under the hero.
 * variant="grid"    -> full cards with name + role, used on the About page.
 * variant="duo"     -> large hero-style portraits with glow effect, for 2-person teams.
 */
function Team({ variant = "grid", members = teamMembers }) {
  if (variant === "duo") {
    return (
      <div className="team team--duo">
        <div className="team-duo__glow" />
        <div className="team-duo-single">
          <img src="/team/team-duo.png" alt="Umair & Anoosha - Co-Founders" />
        </div>
        <div className="team-duo-single__names">
          <div>
            <h4>Anoosha</h4>
            <span>Co-Founder & Full Stack Web Developer</span>
          </div>
          <div>
            <h4>Umair</h4>
            <span>Co-Founder & Full Stack Web Developer</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`team team--${variant}`}>
      {members.map((member, i) => (
        <div key={i} className="team-card">
          <div className="team-card__photo">
            <img src={member.photo} alt={member.name} />
          </div>
          <h4 className="team-card__name">{member.name}</h4>
          <span className="team-card__role">{member.role}</span>
        </div>
      ))}
    </div>
  );
}

export default Team;
