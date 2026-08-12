import "./StatBar.css";
import AnimatedNumber from "./AnimatedNumber";

function StatBar({ stats }) {
  return (
    <div className="container">
      <div className="statbar">
        {stats.map((stat, index) => (
          <div key={index} className="statbar__item">
            <AnimatedNumber value={stat.value} className="statbar__value gradient-text" />
            <span className="statbar__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatBar;
