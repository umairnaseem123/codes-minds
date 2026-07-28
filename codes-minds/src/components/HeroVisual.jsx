import './HeroVisual.css';

const badgeColors = ['#8b5cf6', '#22d3ee', '#ec4899', '#22c55e', '#f97316', '#38bdf8'];

function HeroVisual({
  icon: Icon,
  floatingIcons = [],
  color = 'violet',
  label = 'We Build Digital Experiences That Drive Results',
}) {
  return (
    <div className={`herovisual herovisual--${color}`}>
      <div className="herovisual__frame">
        <div className="herovisual__topbar">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
          <div className="herovisual__urlbar" />
        </div>

        <div className="herovisual__screen">
          <div className="herovisual__glow" />
          <div className="herovisual__core">
            <Icon size={46} />
          </div>
          <p className="herovisual__label">{label}</p>
          <span className="herovisual__pill">Explore More</span>
        </div>
      </div>

      <div className="herovisual__base" />

      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`herovisual__badge herovisual__badge--${index + 1}`}
          style={{ '--badge-color': badgeColors[index % badgeColors.length] }}
        >
          <item.icon size={20} />
        </div>
      ))}
    </div>
  );
}

export default HeroVisual;
