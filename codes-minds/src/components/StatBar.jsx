import "./StatBar.css";

function StatBar({ stats }) {
  return (
    <div className="container">
      <div className="statbar">
        {stats.map((stat, index) => (
          <div key={index} className="statbar__item">
            <span className="statbar__value gradient-text">{stat.value}</span>
            <span className="statbar__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatBar;
