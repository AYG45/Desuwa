import { useState } from 'react';
import { playAudio } from '../utils/tts';
import './CharacterCard.css';

export default function CharacterCard({
  char,
  romaji,
  rowColor,
  isLearned = false,
  size = '',
  onClick,
  showRomaji = true,
}) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
    playAudio(char);
    if (onClick) onClick({ char, romaji });
  };

  return (
    <div className={`char-card-wrapper ${size ? `char-card-${size}` : ''}`}>
      <div
        className={`char-card ${flipped ? 'flipped' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`${char} - ${romaji}`}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        {/* Front */}
        <div className="char-card-face char-card-front">
          <div className={`char-card-learned ${isLearned ? 'show' : ''}`}>✓</div>
          <span className="char-card-character japanese-text">{char}</span>
          {showRomaji && <span className="char-card-romaji">{romaji}</span>}
        </div>

        {/* Back */}
        <div className="char-card-face char-card-back">
          <span className="char-card-character japanese-text">{char}</span>
          <span className="char-card-romaji">{romaji}</span>
          <span className="char-card-label">romaji</span>
        </div>
      </div>
    </div>
  );
}
