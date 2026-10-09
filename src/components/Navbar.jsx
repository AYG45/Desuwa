import { NavLink } from 'react-router-dom';
import { Home, Sparkles, Rocket, BookOpen, Target, User, Tent } from './Icons';
import ThemeToggle from './ThemeToggle';
import DisplayToggle from './DisplayToggle';
import { getLevel } from '../utils/helpers';
import { getDueCount } from '../utils/srs';
import './Navbar.css';

export default function Navbar({ progress, displayMode, setDisplayMode }) {
  const { level, progress: levelProgress } = getLevel(progress.xp);
  const dueReviews = getDueCount(progress.srsItems || []);

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/lessons', icon: <Sparkles size={20} />, label: 'Lessons' },
    { path: '/review', icon: <Rocket size={20} />, label: 'Review', badge: dueReviews > 0 ? dueReviews : null },
    { path: '/grammar', icon: <BookOpen size={20} />, label: 'Grammar' },
    { path: '/practice', icon: <Target size={20} />, label: 'Practice' },
    { path: '/profile', icon: <User size={20} />, label: 'Profile' },
  ];

  const mobileNavItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/lessons', icon: <Sparkles size={20} />, label: 'Lessons' },
    { path: '/review', icon: <Rocket size={20} />, label: 'Review', badge: dueReviews > 0 ? dueReviews : null },
    { path: '/grammar', icon: <BookOpen size={20} />, label: 'Grammar' },
    { path: '/practice', icon: <Target size={20} />, label: 'Practice' },
    { path: '/profile', icon: <User size={20} />, label: 'Profile' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar" id="sidebar-nav">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon"><Tent size={28} /></div>
            <div className="sidebar-logo-text">
              <h1 className="sidebar-logo-title">Desuwa</h1>
              <span>日本語を学ぼう</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Study Path</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              id={`nav-${item.label.toLowerCase()}`}
            >
              <span className="nav-link-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge !== null && item.badge !== undefined && (
                <span className="nav-link-badge">{item.badge}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-level">
            <div className="sidebar-level-badge">{level}</div>
            <div className="sidebar-level-info">
              <span>Level</span>
              <strong>{progress.xp} XP</strong>
              <div className="sidebar-level-bar">
                <div
                  className="sidebar-level-bar-fill"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav" id="bottom-nav">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `bottom-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="bottom-nav-link-icon" style={{ position: 'relative' }}>
              {item.icon}
              {item.badge !== null && item.badge !== undefined && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-8px',
                    background: '#ff6b6b',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 800,
                    borderRadius: '99px',
                    padding: '1px 5px',
                    lineHeight: '1.2',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </span>
            <span className="bottom-nav-link-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
