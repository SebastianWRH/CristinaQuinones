import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './RevealOnScroll.module.css';

const directionOffsets = {
  up: (distance) => ({ x: 0, y: distance }),
  down: (distance) => ({ x: 0, y: -distance }),
  left: (distance) => ({ x: distance, y: 0 }),
  right: (distance) => ({ x: -distance, y: 0 }),
};

function getReducedMotionPreference() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function RevealOnScroll({
  as: Component = 'div',
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 840,
  distance = 60,
  scale = 0.98,
  blur = 8,
  once = true,
  threshold = 0.16,
  rootMargin = '0px 0px -10% 0px',
  variant = 'default',
  parallax = false,
  parallaxDistance = 20,
  style,
  onReveal,
  ...rest
}) {
  const elementRef = useRef(null);
  const hasRevealedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  const offset = useMemo(() => {
    const getOffset = directionOffsets[direction] ?? directionOffsets.up;
    return getOffset(distance);
  }, [direction, distance]);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    const reveal = () => {
      if (!hasRevealedRef.current) {
        hasRevealedRef.current = true;
        onReveal?.();
      }

      setIsVisible(true);
    };

    if (
      getReducedMotionPreference() ||
      typeof window === 'undefined' ||
      typeof window.IntersectionObserver === 'undefined'
    ) {
      reveal();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();

          if (once) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [onReveal, once, rootMargin, threshold]);

  const revealStyle = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-duration': `${duration}ms`,
    '--reveal-x': `${offset.x}px`,
    '--reveal-y': `${offset.y}px`,
    '--reveal-scale': scale,
    '--reveal-blur': `${blur}px`,
    '--reveal-rotate': variant === 'icon' ? '3deg' : '0deg',
    '--reveal-parallax-y': '0px',
    ...(parallax
      ? { '--reveal-parallax-distance': `${Math.min(Math.abs(parallaxDistance), 20)}px` }
      : null),
    ...style,
  };

  return (
    <Component
      ref={elementRef}
      className={`${styles.reveal} ${isVisible ? styles.revealed : ''} ${className}`.trim()}
      data-reveal-variant={variant}
      data-revealed={isVisible ? 'true' : 'false'}
      style={revealStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default RevealOnScroll;
