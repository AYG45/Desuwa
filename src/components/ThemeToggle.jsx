import { useState, useEffect } from 'react';
import { Sun, Moon } from './Icons';
import './ThemeToggle.css';

export default function ThemeToggle({ compact = false }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('desuwa-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('desuwa-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`theme-toggle ${compact ? 'compact' : ''}`} onClick={toggleTheme}>
      <button
        className={`theme-toggle-btn ${compact ? 'compact-btn' : ''}`}
        aria-label="Toggle theme"
        id="theme-toggle"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="theme-toggle-icon">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </span>
        {!compact && (
          <span className="theme-toggle-text">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        )}
      </button>
    </div>
  );
}
