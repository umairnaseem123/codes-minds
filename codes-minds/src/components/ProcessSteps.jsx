import "./ProcessSteps.css";

function ProcessSteps({ steps, eyebrow = "OUR PROCESS", title, highlight }) {
  return (
    <div className="container">
      <div className="processsteps__header">
        <span className="eyebrow">{eyebrow}</span>
        <h2>
          {title} <span className="gradient-text">{highlight}</span>
        </h2>
      </div>

      <div className="processsteps__row">
        {steps.map((step, index) => (
          <div key={index} className="processsteps__item">
            <div className="processsteps__number">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
            {index < steps.length - 1 && (
              <div className="processsteps__connector" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProcessSteps;
