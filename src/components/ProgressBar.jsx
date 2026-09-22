import './ProgressBar.css';

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  color,
  size = '',
  showValue = true,
  shimmer = true,
}) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const gradient = color || 'var(--gradient-primary)';

  return (
    <div className="progress-bar-wrapper">
      {(label || showValue) && (
        <div className="progress-bar-header">
          {label && <span className="progress-bar-label">{label}</span>}
          {showValue && (
            <span className="progress-bar-value">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`progress-bar ${size ? `progress-bar-${size}` : ''}`}>
        <div
          className={`progress-bar-fill ${!shimmer ? 'no-shimmer' : ''}`}
          style={{
            width: `${percentage}%`,
            background: gradient,
          }}
        />
      </div>
    </div>
  );
}
