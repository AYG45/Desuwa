import { MessageCircle } from './Icons';
import './DisplayToggle.css';

export default function DisplayToggle({ displayMode, setDisplayMode, inline = false }) {
  const modes = [
    { id: 'romaji', label: 'Romaji' },
    { id: 'kana', label: 'Kana' },
    { id: 'kanji', label: 'Kanji' },
  ];

  const cycleMode = () => {
    const currentIndex = modes.findIndex((m) => m.id === displayMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setDisplayMode(modes[nextIndex].id);
  };

  const currentLabel = modes.find(m => m.id === displayMode)?.label || 'Kanji';

  return (
    <div className={`display-toggle ${inline ? 'inline' : ''}`} onClick={cycleMode}>
      <button
        className={`display-toggle-btn ${inline ? 'inline-btn' : ''}`}
        aria-label="Toggle display mode"
        id="display-toggle"
        title={`Current mode: ${currentLabel}`}
      >
        <span className="display-toggle-icon">
          <MessageCircle size={20} />
        </span>
        <span className="display-toggle-text">
          {currentLabel} Mode
        </span>
      </button>
    </div>
  );
}
