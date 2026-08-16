import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import StatBar from "../components/StatBar";
import ServiceCard from "../components/ServiceCard";
import CTABanner from "../components/CTABanner";
import { useServices } from "../hooks/useServices";
import { usePortfolio } from "../hooks/usePortfolio";
import { resolveImage } from "../api/config";
import homeHeroImg from "../assets/home-hero.png";
import "./Home.css";

const homeStats = [
  { value: "150+", label: "Projects Completed" },
  { value: "80+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "25+", label: "Team Members" },
  { value: "99%", label: "Client Satisfaction" },
];

const testimonials = [
  {
    quote:
      "CØDES-MINDS delivered a website beyond our expectations. Their attention to detail and support is amazing.",
    name: "Sarah Khan",
    role: "CEO, StartupHub",
  },
  {
    quote:
      "Professional team, creative ideas and on-time delivery. Highly recommended for any digital project.",
    name: "Ali Raza",
    role: "Marketing Head, Penta",
  },
  {
    quote:
      "Outstanding work on our e-commerce store. They really know how to convert ideas into real success.",
    name: "Ayesha Malik",
    role: "Founder, Trendify",
  },
];

function Home() {
  const { services } = useServices();
  const { projects } = usePortfolio();
  const photoRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const el = photoRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <>
      <section className="home-hero section">
        <div className="container home-hero__grid">
          <div className="home-hero__content">
            <span className="badge">WELCOME TO CØDES-MINDS</span>
            <h1>
              We Code Ideas.{" "}
              <span className="gradient-text">You Get Results.</span>
            </h1>
            <p>
              We are a creative digital agency delivering modern web solutions,
              stunning designs, and digital experiences that help your business
              grow and stand out.
            </p>
            <div className="home-hero__actions">
              <Link to="/services" className="btn btn--primary">
                Explore Our Services <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn--outline">
                Get In Touch
              </Link>
            </div>
            <div className="home-hero__trust">
              <div className="home-hero__avatars">
                {["S", "A", "M", "R"].map((initial, i) => (
                  <span key={i} className="home-hero__avatar">
                    {initial}
                  </span>
                ))}
              </div>
              <div>
                <div className="home-hero__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="#eab308" color="#eab308" />
                  ))}
                </div>
                <span>Trusted by 50+ Clients Worldwide</span>
              </div>
            </div>
          </div>

          <div className="home-hero__visual">
            <div
              className="home-hero__photo"
              ref={photoRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={homeHeroImg}
                alt="Umair & Anoosha - Co-Founders of Codes-Minds"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section home-intro-video">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">WHO WE ARE</span>
            <h2>
              Meet The <span className="gradient-text">CØDES-MINDS</span> Way
            </h2>
            <p>
              Code. Design. Solve. Watch how we turn ideas into digital
              experiences that work.
            </p>
          </div>
          <div className="home-intro-video__frame">
            <video
              src="/videos/codes-minds-intro.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
        </div>
      </section>

      <StatBar stats={homeStats} />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">WHAT WE DO</span>
            <h2>
              Premium Services To Elevate{" "}
              <span className="gradient-text">Your Business</span>
            </h2>
            <p>
              We combine creativity, technology, and strategy to deliver digital
              solutions that drive real results.
            </p>
          </div>

          <div className="home-services-grid">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section home-projects">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">OUR WORK</span>
            <h2>
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p>
              Here are some of our recent works that helped brands achieve real
              results.
            </p>
          </div>

          <div className="home-projects__grid">
            {projects.slice(0, 3).map((project) => (
              <div key={project._id} className="home-project-card">
                <div className="home-project-card__image">
                  <img
                    src={resolveImage(project.images?.[0])}
                    alt={project.title}
                  />
                </div>
                <div className="home-project-card__body">
                  <span className="home-project-card__tag">
                    {project.service?.title}
                  </span>
                  <h4>{project.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="home-projects__cta">
            <Link to="/portfolio" className="btn btn--outline">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-testimonials">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">CLIENTS LOVE US</span>
            <h2>
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </div>

          <div className="home-testimonials__grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <span className="testimonial-card__quote">&ldquo;</span>
                <p>{t.quote}</p>
                <div className="testimonial-card__footer">
                  <div className="testimonial-card__avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5>{t.name}</h5>
                    <span>{t.role}</span>
                  </div>
                  <div className="testimonial-card__stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} fill="#eab308" color="#eab308" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-cta">
        <CTABanner />
      </section>
    </>
  );
}

export default Home;
