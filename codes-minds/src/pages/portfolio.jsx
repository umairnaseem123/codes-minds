import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CTABanner from "../components/CTABanner";
import { portfolioProjects } from "../data/portfolio";
import "./Portfolio.css";

const stats = [
  { value: `${portfolioProjects.length}+`, label: "Projects Completed" },
  { value: "5+", label: "Happy Clients" },
  { value: "1+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

const filters = ["All", ...new Set(portfolioProjects.flatMap((p) => p.tags))];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.tags.includes(activeFilter));

  return (
    <>
      <section className="section portfolio-hero">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">OUR PORTFOLIO</span>
            <h1>
              Our Work. <span className="gradient-text">Your Success.</span>
            </h1>
            <p>
              Explore our latest projects that showcase creativity, technical
              expertise and results that speak for themselves.
            </p>
          </div>

          <div className="portfolio-stats">
            {stats.map((stat, i) => (
              <div key={i} className="portfolio-stat">
                <span className="gradient-text">{stat.value}</span>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section portfolio-grid-section">
        <div className="container">
          <div className="portfolio-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`portfolio-filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredProjects.map((project, i) => (
              <div key={i} className="portfolio-card">
                <div className="portfolio-card__image">
                  <img src={project.image} alt={project.name} />
                </div>
                <div className="portfolio-card__body">
                  <div className="portfolio-card__tags">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="portfolio-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section portfolio-cta">
        <CTABanner
          title="Have A Project In Mind?"
          subtitle="Let's work together and create something amazing."
        />
      </section>
    </>
  );
}

export default Portfolio;
