import emailjs from "@emailjs/browser";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Headphones,
  ShieldCheck,
  Users,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";
import "./Contact.css";

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+92 317 0939872", "Mon - Sat (10:00 AM - 7:00 PM)"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["anoshacod@gmail.com", "We reply within 24 hours"],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Karachi, Pakistan", "Come say hello at our office"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon - Sat: 10:00 AM - 7:00 PM", "Sunday: Closed"],
  },
];

const trustPoints = [
  {
    icon: Headphones,
    title: "Quick Response",
    desc: "We reply to all inquiries within 24 hours.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    desc: "Your data and project details are safe with us.",
  },
  {
    icon: Users,
    title: "Expert Support",
    desc: "Get help from our experienced team anytime.",
  },
  {
    icon: ThumbsUp,
    title: "Client Satisfaction",
    desc: "We're committed to delivering the best solutions.",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    emailjs
      .send(
        "service_vgzpxzw",
        "template_f3ptv58",
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        "wCPlHEI7FjiduEoZS",
      )
      .then(() => {
        setSubmitted(true);
        setSending(false);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setError(
          "Something went wrong. Please try again or email us directly.",
        );
        setSending(false);
      });
  };
  return (
    <>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">CONTACT US</span>
            <h1>
              Let&apos;s Start Your{" "}
              <span className="gradient-text">Next Project</span> Together
            </h1>
            <p>
              Have a question or a project in mind? We&apos;d love to hear from
              you. Fill out the form or reach us through any of the channels
              below.
            </p>

            <div className="contact-cards">
              {contactCards.map((card, i) => (
                <div key={i} className="contact-card">
                  <div className="contact-card__icon">
                    <card.icon size={20} />
                  </div>
                  <div>
                    <h4>{card.title}</h4>
                    {card.lines.map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap">
            <h3>Send Us a Message</h3>

            {submitted ? (
              <div className="contact-form__success">
                <ShieldCheck size={32} />
                <h4>Message Sent!</h4>
                <p>
                  Thanks for reaching out — we&apos;ll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form__row">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className="btn btn--primary contact-form__submit"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Message"} <Send size={16} />
                </button>
                {error && <p className="contact-form__error">{error}</p>}
                <p className="contact-form__note">
                  We respect your privacy. Your information is safe with us.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section contact-trust">
        <div className="container contact-trust__grid">
          {trustPoints.map((point, i) => (
            <div key={i} className="trust-card">
              <div className="trust-card__icon">
                <point.icon size={22} />
              </div>
              <h4>{point.title}</h4>
              <p>{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section contact-office">
        <div className="container contact-office__grid">
          <div>
            <span className="eyebrow">OUR OFFICE</span>
            <h2>
              We&apos;re Based in{" "}
              <span className="gradient-text">Karachi, Pakistan</span>
            </h2>
            <p>
              We love meeting our clients! Feel free to visit our office during
              working hours.
            </p>
            <ul className="contact-office__list">
              <li>
                <MapPin size={16} /> Karachi, Pakistan
              </li>
              <li>
                <Phone size={16} /> +92 317 0939872
              </li>
              <li>
                <Mail size={16} /> anoshacod@gmail.com
              </li>
            </ul>
            <a
              href="https://www.google.com/maps?q=Karachi,Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline contact-office__directions"
            >
              Get Directions <ArrowRight size={16} />
            </a>
          </div>

          <div className="contact-office__map">
            <iframe
              title="CØDES-MINDS Office Location"
              src="https://www.google.com/maps?q=Karachi,Pakistan&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section contact-cta">
        <div className="container">
          <div className="contact-cta__banner">
            <div>
              <h3>Have a project in mind?</h3>
              <p>
                Let&apos;s discuss your ideas and turn them into real solutions.
              </p>
            </div>
            <a href="#top" className="btn btn--white">
              Start Your Project <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
