import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useServices } from "../hooks/useServices";
import logo from "../assets/logo.png";
import "./Header.css";

function Header() {
  const { services } = useServices();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 968 : false
  );
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 968);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDropdownEnter = () => {
    if (!isMobile) setServicesOpen(true);
  };

  const handleDropdownLeave = () => {
    if (!isMobile) setServicesOpen(false);
  };

  const handleServicesLinkClick = (e) => {
    if (isMobile) {
      // On mobile, first tap opens the dropdown instead of navigating away
      if (!servicesOpen) {
        e.preventDefault();
        setServicesOpen(true);
      }
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container header__inner">
          <Link to="/" className="header__logo">
            <img src={logo} alt="CØDES-MINDS" />
          </Link>

          <nav
            className={`header__nav ${mobileOpen ? "header__nav--open" : ""}`}
          >
            <NavLink to="/" className="header__link" end>
              Home
            </NavLink>
            <NavLink to="/about" className="header__link">
              About Us
            </NavLink>

            <div
              className={`header__dropdown ${
                servicesOpen ? "header__dropdown--open" : ""
              }`}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <NavLink
                to="/services"
                className="header__link header__link--dropdown"
                onClick={handleServicesLinkClick}
              >
                Services
                <ChevronDown
                  size={16}
                  className={servicesOpen ? "rotate" : ""}
                />
              </NavLink>

              {servicesOpen && (
                <div className="header__dropdown-menu">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="header__dropdown-item"
                    >
                      <service.icon size={16} />
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/contact" className="header__link">
              Contact
            </NavLink>

            <Link
              to="/contact"
              className="btn btn--primary header__cta header__cta--mobile"
            >
              Get In Touch <ChevronDown size={16} className="header__cta-arrow" />
            </Link>
          </nav>

          <div className="header__actions">
            <Link to="/contact" className="btn btn--primary header__cta">
              Get In Touch{" "}
              <ChevronDown size={16} className="header__cta-arrow" />
            </Link>

            <button
              className="header__toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`header__overlay ${
          mobileOpen ? "header__overlay--visible" : ""
        }`}
        onClick={() => setMobileOpen(false)}
      />
    </>
  );
}

export default Header;
