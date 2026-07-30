import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import HeroVisual from "../components/HeroVisual";
import StatBar from "../components/StatBar";
import ProcessSteps from "../components/ProcessSteps";
import CTABanner from "../components/CTABanner";
import { useServices } from "../hooks/useServices";
import { getServiceBySlug } from "../data/services";
import { getPortfolio } from "../api/portfolio";
import { resolveImage } from "../api/config";
import "./ServiceDetail.css";

function ServiceDetail() {
  const { slug } = useParams();
  const { services, loading } = useServices();
  const service = getServiceBySlug(services, slug);

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Fetch only the portfolio projects tagged to this specific service's id,
  // so each service page shows just its own completed work.
  useEffect(() => {
    if (!service?.id) return;
    let cancelled = false;
    setProjectsLoading(true);
    getPortfolio(service.id)
      .then((res) => {
        if (!cancelled) setProjects(res.data || []);
      })
      .catch(() => {
        if (!cancelled) setProjects([]);
      })
      .finally(() => {
        if (!cancelled) setProjectsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [service?.id]);

  if (!service) {
    if (loading) return null;
    return <Navigate to="/services" replace />;
  }

  const otherServices = services.filter((s) => s.slug !== slug);
  const floatingIcons = otherServices
    .slice(0, 6)
    .map((s) => ({ icon: s.icon }));

  return (
    <>
      <section className="section service-detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/services">Services</Link>
            <ChevronRight size={14} />
            <span>{service.title}</span>
          </div>

          <div
            className={`service-detail-hero__grid service-detail-hero__grid--${service.color}`}
          >
            <div>
              <span className="eyebrow">
                {service.title.toUpperCase()} SERVICES
              </span>
              <h1>
                {service.heroLines.map((line, i) => (
                  <span
                    key={i}
                    className={
                      line === service.heroHighlight ? "gradient-text" : ""
                    }
                  >
                    {line}
                    <br />
                  </span>
                ))}
              </h1>
              <p>{service.heroDesc}</p>

              <ul className="service-detail-hero__features">
                {service.heroFeatures.map((f, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} /> {f}
                  </li>
                ))}
              </ul>

              <div className="service-detail-hero__actions">
                <Link to="/contact" className="btn btn--primary">
                  Start Your Project <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn btn--outline">
                  View All Services
                </Link>
              </div>
            </div>

            {service.heroImage ? (
              <div className="service-detail-hero__image">
                <img src={service.heroImage} alt={service.title} />
              </div>
            ) : (
              <HeroVisual
                icon={service.icon}
                color={service.color}
                floatingIcons={floatingIcons}
              />
            )}
          </div>
        </div>
      </section>

      <StatBar stats={service.stats} />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">WHAT WE OFFER</span>
            <h2>
              {service.title}{" "}
              <span className="gradient-text">That Deliver Results</span>
            </h2>
            <p>{service.shortDesc}</p>
          </div>

          <div
            className={`service-offerings-grid service-offerings-grid--${service.color}`}
          >
            {service.offerings.map((offering, i) => (
              <div key={i} className="offering-card">
                <h4>{offering.title}</h4>
                <p>{offering.desc}</p>
                {offering.features.length > 0 && (
                  <ul>
                    {offering.features.map((f, j) => (
                      <li key={j}>
                        <CheckCircle2 size={14} /> {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {!projectsLoading && projects.length > 0 && (
        <section className="section service-detail-work">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">OUR WORK</span>
              <h2>
                Real <span className="gradient-text">{service.title} Projects</span>
              </h2>
              <p>{`A few ${service.title} projects we've delivered for clients.`}</p>
            </div>

            <div className="service-detail-work__grid">
              {projects.map((project) => (
                <div key={project._id} className="work-card">
                  <div className="work-card__image">
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={resolveImage(project.images[0])}
                        alt={project.title}
                      />
                    ) : (
                      <div className="work-card__image--placeholder" />
                    )}
                    {project.images && project.images.length > 1 && (
                      <span className="work-card__count">
                        +{project.images.length - 1}
                      </span>
                    )}
                  </div>
                  <div className="work-card__body">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    {project.client && (
                      <span className="work-card__client">{project.client}</span>
                    )}
                    {project.link && (
                      
                        <a                      
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-card__link"
                      >
                        Visit Project <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section service-detail-process">
        <ProcessSteps
          steps={service.process}
          eyebrow="OUR PROCESS"
          title="From Concept To"
          highlight="Launch"
        />
      </section>

      <section className="section">
        <div className="container">
          <div className="service-detail-tools">
            <div className="service-detail-tools__header">
              <span className="eyebrow">TOOLS WE USE</span>
              <h3>Technologies & Tools</h3>
            </div>
            <div className="service-detail-tools__list">
              {service.tools.map((tool, i) => (
                <span key={i} className="tool-chip">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section service-detail-cta">
        <CTABanner
          title={`Ready To Get Started With ${service.title}?`}
          subtitle="Let's build something amazing together."
        />
      </section>
    </>
  );
}

export default ServiceDetail;