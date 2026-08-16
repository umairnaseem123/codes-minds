import {
  Code2,
  Palette,
  Rocket,
  Monitor,
  Smartphone,
  Sparkles,
} from "lucide-react";
import "./HeroVisual.css";

function HeroVisual() {
  return (
    <div className="hero-visual">
      {/* Background Glow */}
      <div className="hero-visual__glow hero-visual__glow--one" />
      <div className="hero-visual__glow hero-visual__glow--two" />

      {/* Main Browser */}
      <div className="hero-browser">
        <div className="hero-browser__topbar">
          <div className="hero-browser__dots">
            <span />
            <span />
            <span />
          </div>

          <div className="hero-browser__address">
            <span className="hero-browser__lock">●</span>
            codes-minds.com
          </div>
        </div>

        <div className="hero-browser__content">
          <span className="hero-browser__eyebrow">DIGITAL EXPERIENCE</span>

          <h3>
            Turning Ideas Into
            <span> Digital Reality.</span>
          </h3>

          <p>
            Modern websites and powerful digital solutions built to help
            businesses grow and succeed.
          </p>

          <button type="button">Explore Project</button>

          <div className="hero-browser__stats">
            <div>
              <strong>150+</strong>
              <span>Projects</span>
            </div>

            <div>
              <strong>80+</strong>
              <span>Clients</span>
            </div>

            <div>
              <strong>99%</strong>
              <span>Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Web Development Card */}
      <div className="floating-card floating-card--web">
        <div className="floating-card__icon">
          <Code2 size={22} />
        </div>

        <div>
          <h4>Web Development</h4>
          <p>Modern. Fast. Scalable.</p>
        </div>
      </div>

      {/* UI UX Card */}
      <div className="floating-card floating-card--design">
        <div className="floating-card__icon floating-card__icon--pink">
          <Palette size={21} />
        </div>

        <div>
          <h4>UI/UX Design</h4>
          <p>Beautiful experiences.</p>
        </div>
      </div>

      {/* Full Stack Card */}
      <div className="floating-card floating-card--fullstack">
        <div className="floating-card__icon floating-card__icon--blue">
          <Rocket size={22} />
        </div>

        <div>
          <h4>Full Stack Solutions</h4>
          <p>From idea to deployment.</p>
        </div>
      </div>

      {/* Phone Card */}
      <div className="hero-phone">
        <div className="hero-phone__speaker" />

        <div className="hero-phone__screen">
          <div className="hero-phone__small-dot" />

          <span>Digital</span>

          <h4>
            Creative
            <br />
            Solutions
          </h4>

          <div className="hero-phone__line" />

          <div className="hero-phone__blocks">
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* Screen Card */}
      <div className="hero-screen-card">
        <Monitor size={40} />
        <span>Creative Web</span>
      </div>

      {/* Code Card */}
      <div className="hero-code-card">
        <div className="hero-code-card__header">
          <Code2 size={15} />
          <span>Clean. Scalable. Efficient.</span>
        </div>

        <div className="hero-code-card__line">
          <span>const</span> ideas = [
        </div>

        <div className="hero-code-card__item">'Design',</div>

        <div className="hero-code-card__item">'Development',</div>

        <div className="hero-code-card__item">'Success'</div>

        <div className="hero-code-card__line">];</div>
      </div>

      {/* Bottom Feature Icons */}
      <div className="hero-feature-bar">
        <div>
          <Rocket size={22} />
          <strong>150+</strong>
          <span>Projects</span>
        </div>

        <div>
          <Smartphone size={22} />
          <strong>80+</strong>
          <span>Clients</span>
        </div>

        <div>
          <Sparkles size={22} />
          <strong>99%</strong>
          <span>Success</span>
        </div>
      </div>
    </div>
  );
}

export default HeroVisual;
