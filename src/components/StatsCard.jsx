import './StatsCard.css';

export default function StatsCard({ icon, label, value, color, change }) {
  const bgColor = color ? `${color}15` : 'var(--bg-tertiary)';
  const borderTopColor = color || 'var(--accent-primary)';

  return (
    <div
      className="stats-card"
      style={{ '--stats-accent': color }}
    >
      <div
        className="stats-card-icon"
        style={{ background: bgColor }}
      >
        {icon}
      </div>
      <div className="stats-card-content">
        <div className="stats-card-label">{label}</div>
        <div className="stats-card-value">{value}</div>
        {change !== undefined && (
          <span
            className={`stats-card-change ${change >= 0 ? 'positive' : 'negative'}`}
          >
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}
          </span>
        )}
      </div>
      <style>{`
        .stats-card:hover::before {
          background: ${borderTopColor};
        }
      `}</style>
    </div>
  );
}
