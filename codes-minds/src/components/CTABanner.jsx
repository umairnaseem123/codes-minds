import { Link } from "react-router-dom";
import { Rocket, ArrowRight } from "lucide-react";
import "./CTABanner.css";

function CTABanner({
  icon: Icon = Rocket,
  title = "Ready to start your next project?",
  subtitle = "Let's build something amazing together.",
  buttonText = "Get Free Consultation",
  buttonLink = "/contact",
}) {
  return (
    <div className="container">
      <div className="ctabanner">
        <div className="ctabanner__icon">
          <Icon size={22} />
        </div>
        <div className="ctabanner__text">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <Link to={buttonLink} className="btn btn--white">
          {buttonText} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default CTABanner;
