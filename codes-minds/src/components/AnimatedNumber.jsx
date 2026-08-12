import { useEffect, useRef, useState } from "react";

const ANIMATION_DURATION = 1800;
const LOOP_DELAY = 1800;

function AnimatedNumber({ value, className = "" }) {
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
        cancelAnimationFrame(frameId);
        clearTimeout(loopTimeout);

        if (isVisible) {
          setDisplayValue(0);
          animate();
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
    <span ref={valueRef} className={className} aria-label={value}>
      {displayValue}{suffix}
    </span>
  );
}

export default AnimatedNumber;
