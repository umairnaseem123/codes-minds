import { useEffect, useRef, useState } from "react";
import "./StatBar.css";

const ANIMATION_DURATION = 1800;
const LOOP_DELAY = 1800;

function AnimatedNumber({ value }) {
  const target = Number.parseInt(value, 10) || 0;
  const suffix = value.replace(String(target), "");
  const [displayValue, setDisplayValue] = useState(0);
  const valueRef = useRef(null);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return undefined;

    let frameId;
    let loopTimeout;
    let isVisible = false;

    const animate = () => {
      const startTime = performance.now();

      const update = (now) => {
        const progress = Math.min((now - startTime) / ANIMATION_DURATION, 1);
        // Ease out keeps the last few increments smooth and readable.
        const easedProgress = 1 - (1 - progress) ** 3;
        setDisplayValue(Math.round(target * easedProgress));

        if (progress < 1 && isVisible) {
          frameId = requestAnimationFrame(update);
        } else if (isVisible) {
          loopTimeout = window.setTimeout(() => {
            setDisplayValue(0);
            frameId = requestAnimationFrame(animate);
          }, LOOP_DELAY);
        }
      };

      frameId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          cancelAnimationFrame(frameId);
          clearTimeout(loopTimeout);
          setDisplayValue(0);
          animate();
        } else {
          cancelAnimationFrame(frameId);
          clearTimeout(loopTimeout);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      clearTimeout(loopTimeout);
    };
  }, [target]);

  return (
    <span ref={valueRef} className="statbar__value gradient-text" aria-label={value}>
      {displayValue}{suffix}
    </span>
  );
}

function StatBar({ stats }) {
  return (
    <div className="container">
      <div className="statbar">
        {stats.map((stat, index) => (
          <div key={index} className="statbar__item">
            <AnimatedNumber value={stat.value} />
            <span className="statbar__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatBar;
