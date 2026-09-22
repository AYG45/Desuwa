import { NavLink } from 'react-router-dom';
import { Home, Book, Target, BookOpen, User, Tent, LayoutGrid, Search as SearchIcon } from './Icons';
import ThemeToggle from './ThemeToggle';
import DisplayToggle from './DisplayToggle';
import { getLevel } from '../utils/helpers';
import './Navbar.css';

const navItems = [
  { path: '/', icon: <Home size={20} />, label: 'Home' },
  { path: '/learn', icon: <Book size={20} />, label: 'Learn' },
  { path: '/practice', icon: <Target size={20} />, label: 'Practice' },
  { path: '/chart', icon: <LayoutGrid size={20} />, label: 'Kana Chart' },
  { path: '/dictionary', icon: <SearchIcon size={20} />, label: 'Dictionary' },
  { path: '/vocabulary', icon: <BookOpen size={20} />, label: 'Vocabulary' },
  { path: '/profile', icon: <User size={20} />, label: 'Profile' },
];

export default function Navbar({ progress, displayMode, setDisplayMode }) {
  const { level, progress: levelProgress } = getLevel(progress.xp);

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
          <div className="nav-section-label">Menu</div>
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
              {item.label}
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
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `bottom-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="bottom-nav-link-icon">{item.icon}</span>
            <span className="bottom-nav-link-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
