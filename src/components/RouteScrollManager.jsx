import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function getScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';
}

function updateHeaderOffset() {
  const header = document.querySelector('[data-site-header]');
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  document.documentElement.style.setProperty(
    '--header-offset',
    `${Math.ceil(headerHeight + 16)}px`
  );
}

function RouteScrollManager() {
  const { hash, pathname } = useLocation();

  useLayoutEffect(() => {
    updateHeaderOffset();

    const header = document.querySelector('[data-site-header]');

    if (!header || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(updateHeaderOffset);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const scroll = () => {
      updateHeaderOffset();

      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const id = decodeURIComponent(hash.slice(1));
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          block: 'start',
          behavior: getScrollBehavior(),
        });
      }
    };

    frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scroll);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}

export default RouteScrollManager;
