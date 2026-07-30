import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useServices } from "../hooks/useServices";
import logo from "../assets/logo.png";
import "./Footer.css";

function Footer() {
  const { services } = useServices();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src={logo} alt="CØDES-MINDS" />
          </Link>
          <p>
            We are a creative digital agency crafting digital experiences that
            help businesses grow and succeed.
          </p>
          <div className="footer__socials">
            <a
              href="https://www.facebook.com/profile.php?id=61592237829755"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://www.linkedin.com/groups/32890000/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="https://wa.me/923170939872"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Our Services</h4>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact Us</h4>
          <ul className="footer__contact">
            <li>
              <Phone size={16} /> +92 317 0939872
            </li>
            <li>
              <Mail size={16} /> anoshacod@gmail.com
            </li>
            <li>
              <MapPin size={16} /> Karachi, Pakistan
            </li>
          </ul>
        </div>

        <div className="footer__col footer__newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe to get updates and exclusive offers.</p>
          <form
            className="footer__newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" aria-label="Subscribe">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} CØDES-MINDS. All Rights Reserved.</p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
