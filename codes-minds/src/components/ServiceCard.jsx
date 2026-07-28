import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./ServiceCard.css";

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <Link
      to={`/services/${service.slug}`}
      className={`servicecard servicecard--${service.color}`}
    >
      <div className="servicecard__icon">
        <Icon size={26} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.shortDesc}</p>
      <span className="servicecard__link">
        Learn More <ArrowRight size={16} />
      </span>
    </Link>
  );
}

export default ServiceCard;
