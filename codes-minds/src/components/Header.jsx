import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { useServices } from "../hooks/useServices";
import logo from "../assets/logo.png";
import "./Header.css";

function Header() {
  const { services } = useServices();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 968 : false,
  );

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
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
    if (!isMobile) {
      setServicesOpen(true);
    }
  };

  const handleDropdownLeave = () => {
    if (!isMobile) {
      setServicesOpen(false);
    }
  };

  const handleServicesLinkClick = (e) => {
    if (isMobile && !servicesOpen) {
      e.preventDefault();
      setServicesOpen(true);
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container header__inner">
          {/* LOGO */}
          <Link to="/" className="header__logo">
            <img src={logo} alt="CØDES-MINDS" />
          </Link>

          {/* NAVIGATION */}
          <nav
            className={`header__nav ${mobileOpen ? "header__nav--open" : ""}`}
          >
            <NavLink to="/" className="header__link" end>
              Home
            </NavLink>

            <NavLink to="/about" className="header__link">
              About Us
            </NavLink>

            {/* SERVICES DROPDOWN */}
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
                  {services.map((service) => {
                    const Icon = service.icon;

                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="header__dropdown-item"
                      >
                        <Icon size={16} />

                        <span>{service.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <NavLink to="/contact" className="header__link">
              Contact
            </NavLink>

            {/* MOBILE GET IN TOUCH */}
            <Link to="/contact" className="header__mobile-cta">
              Get In Touch
              <ArrowRight size={17} />
            </Link>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="header__actions">
            {/* ONLY ONE DESKTOP GET IN TOUCH */}
            <Link to="/contact" className="btn btn--primary header__cta">
              Get In Touch
              <ArrowRight size={17} />
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

      {/* MOBILE OVERLAY */}
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
