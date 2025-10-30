// src/components/ui/Counter.jsx
import React, { useState, useEffect, useRef } from "react";

const easeOutQuad = (t) => t * (2 - t); // easing function (ease-out)

const Counter = ({ target, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = null;
    const end = parseInt(target);
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      setCount(Math.floor(end * easedProgress));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref} className="text-3xl font-bold lg:text-4xl">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default Counter;
