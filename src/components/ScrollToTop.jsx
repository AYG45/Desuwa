import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Automatically resets scroll position to the top of the page on route changes.
 * Fixes the issue where navigating from the bottom of the home screen leaves the new page scrolled down.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's automatic scroll restoration on SPA navigations
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Immediately reset scroll position
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // Fallback for documentElement and body
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // In case a layout container is scrolled
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
