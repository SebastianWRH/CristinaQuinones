import { useEffect, useMemo, useRef, useState } from 'react';

function getReducedMotionPreference() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function parseCounterValue(value) {
  const text = String(value);
  const match = text.match(/-?\d+(?:[.,]\d+)?/);

  if (!match) {
    return null;
  }

  const numberText = match[0];
  const decimals = numberText.includes('.') || numberText.includes(',')
    ? numberText.split(/[.,]/)[1].length
    : 0;

  return {
    target: Number(numberText.replace(',', '.')),
    prefix: text.slice(0, match.index),
    suffix: text.slice(match.index + numberText.length),
    decimals,
  };
}

function formatNumber(value, decimals) {
  return value.toLocaleString('es-PE', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

function AnimatedCounter({ value, duration = 1000 }) {
  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const parsedValue = useMemo(() => parseCounterValue(value), [value]);
  const [displayValue, setDisplayValue] = useState(() => {
    if (!parsedValue) {
      return value;
    }

    return `${parsedValue.prefix}0${parsedValue.suffix}`;
  });

  useEffect(() => {
    if (!parsedValue) {
      return undefined;
    }

    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    const finish = () => {
      hasAnimatedRef.current = true;
      setDisplayValue(
        `${parsedValue.prefix}${formatNumber(parsedValue.target, parsedValue.decimals)}${parsedValue.suffix}`
      );
    };

    const runAnimation = () => {
      if (hasAnimatedRef.current || getReducedMotionPreference()) {
        finish();
        return;
      }

      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        const currentValue = parsedValue.target * easedProgress;

        setDisplayValue(
          `${parsedValue.prefix}${formatNumber(currentValue, parsedValue.decimals)}${parsedValue.suffix}`
        );

        if (progress < 1) {
          window.requestAnimationFrame(tick);
          return;
        }

        finish();
      };

      window.requestAnimationFrame(tick);
    };

    if (
      getReducedMotionPreference() ||
      typeof window === 'undefined' ||
      typeof window.IntersectionObserver === 'undefined'
    ) {
      finish();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        runAnimation();
        observer.unobserve(entry.target);
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [duration, parsedValue, value]);

  return (
    <span ref={elementRef} aria-label={String(value)}>
      {parsedValue ? displayValue : value}
    </span>
  );
}

export default AnimatedCounter;
