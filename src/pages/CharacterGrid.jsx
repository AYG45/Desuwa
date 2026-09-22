import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { hiraganaBasic, hiraganaDakuten, hiraganaRows } from '../data/hiragana';
import { katakanaBasic, katakanaDakuten, katakanaRows } from '../data/katakana';
import { kanjiN5 } from '../data/kanji';
import './CharacterGrid.css';

export default function CharacterGrid({ progress, onLearnCharacter }) {
  const { type } = useParams(); // 'hiragana' | 'katakana' | 'kanji'
  const [filter, setFilter] = useState('basic');
  const [selectedKanji, setSelectedKanji] = useState(null);

  // Select data based on type
  let characters = [];
  let rows = {};
  let title = '';
  let description = '';
  let learnedList = [];

  if (type === 'hiragana') {
    characters = filter === 'dakuten' ? hiraganaDakuten : hiraganaBasic;
    rows = hiraganaRows;
    title = 'Hiragana';
    description = 'The basic Japanese phonetic alphabet — click a character to flip it';
    learnedList = progress.learnedHiragana;
  } else if (type === 'katakana') {
    characters = filter === 'dakuten' ? katakanaDakuten : katakanaBasic;
    rows = katakanaRows;
    title = 'Katakana';
    description = 'Used for foreign words and loanwords — click to learn';
    learnedList = progress.learnedKatakana;
  } else {
    title = 'Kanji N5';
    description = 'Essential kanji for JLPT N5 — click for details';
    learnedList = progress.learnedKanji;
  }

  // Group characters by row
  const groupedByRow = {};
  if (type !== 'kanji') {
    characters.forEach((ch) => {
      if (!groupedByRow[ch.row]) groupedByRow[ch.row] = [];
      groupedByRow[ch.row].push(ch);
    });
  }

  const handleCharClick = ({ char, romaji }) => {
    if (type === 'hiragana') {
      onLearnCharacter('hiragana', char);
    } else if (type === 'katakana') {
      onLearnCharacter('katakana', char);
    }
  };

  const handleKanjiClick = (kanji) => {
    setSelectedKanji(kanji);
    onLearnCharacter('kanji', kanji.char);
  };

  return (
    <div className="chargrid-page page-enter" id="chargrid-page">
      {/* Header */}
      <div className="chargrid-header">
        <Link to="/learn" className="chargrid-back" aria-label="Back to Learn">
          ←
        </Link>
        <div className="chargrid-title-group">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="chargrid-stats">
          <div className="chargrid-stat">
            <div className="chargrid-stat-value">{learnedList.length}</div>
            <div className="chargrid-stat-label">Learned</div>
          </div>
          <div className="chargrid-stat">
            <div className="chargrid-stat-value">
              {type === 'kanji' ? kanjiN5.length : characters.length}
            </div>
            <div className="chargrid-stat-label">Total</div>
          </div>
        </div>
      </div>

      {/* Filters (hiragana/katakana only) */}
      {type !== 'kanji' && (
        <div className="chargrid-filters">
          <button
            className={`chargrid-filter-btn ${filter === 'basic' ? 'active' : ''}`}
            onClick={() => setFilter('basic')}
          >
            Basic (46)
          </button>
          <button
            className={`chargrid-filter-btn ${filter === 'dakuten' ? 'active' : ''}`}
            onClick={() => setFilter('dakuten')}
          >
            Dakuten (25)
          </button>
        </div>
      )}

      {/* Character Grid (hiragana / katakana) */}
      {type !== 'kanji' &&
        Object.entries(groupedByRow).map(([rowKey, chars]) => (
          <div key={rowKey}>
            <div className="chargrid-row-label">
              <span
                className="chargrid-row-dot"
                style={{ backgroundColor: rows[rowKey]?.color }}
              />
              <span className="chargrid-row-name">
                {rows[rowKey]?.label || rowKey}
              </span>
              <span className="chargrid-row-line" />
            </div>
            <div className="chargrid-grid">
              {chars.map((ch) => (
                <CharacterCard
                  key={ch.char}
                  char={ch.char}
                  romaji={ch.romaji}
                  rowColor={rows[rowKey]?.color}
                  isLearned={learnedList.includes(ch.char)}
                  onClick={handleCharClick}
                />
              ))}
            </div>
          </div>
        ))}

      {/* Kanji Grid */}
      {type === 'kanji' && (
        <div className="kanji-grid">
          {kanjiN5.map((kanji) => (
            <div
              key={kanji.char}
              className="kanji-card"
              onClick={() => handleKanjiClick(kanji)}
              style={{ position: 'relative' }}
            >
              {learnedList.includes(kanji.char) && (
                <div className="kanji-card-learned">✓</div>
              )}
              <div className="kanji-card-char">{kanji.char}</div>
              <div className="kanji-card-meaning">{kanji.meaning}</div>
              <div className="kanji-card-reading">{kanji.onyomi}</div>
            </div>
          ))}
        </div>
      )}

      {/* Kanji Detail Modal */}
      {selectedKanji && (
        <div
          className="kanji-modal-overlay"
          onClick={() => setSelectedKanji(null)}
        >
          <div
            className="kanji-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="kanji-modal-close"
              onClick={() => setSelectedKanji(null)}
            >
              ✕
            </button>

            <div className="kanji-modal-char">{selectedKanji.char}</div>
            <div className="kanji-modal-meaning">{selectedKanji.meaning}</div>

            <div className="kanji-modal-details">
              <div className="kanji-modal-detail">
                <div className="kanji-modal-detail-label">On'yomi</div>
                <div className="kanji-modal-detail-value">
                  {selectedKanji.onyomi}
                </div>
              </div>
              <div className="kanji-modal-detail">
                <div className="kanji-modal-detail-label">Kun'yomi</div>
                <div className="kanji-modal-detail-value">
                  {selectedKanji.kunyomi || '—'}
                </div>
              </div>
              <div className="kanji-modal-detail">
                <div className="kanji-modal-detail-label">Strokes</div>
                <div className="kanji-modal-detail-value">
                  {selectedKanji.strokes}
                </div>
              </div>
              <div className="kanji-modal-detail">
                <div className="kanji-modal-detail-label">Level</div>
                <div className="kanji-modal-detail-value">N5</div>
              </div>
            </div>

            {selectedKanji.examples && selectedKanji.examples.length > 0 && (
              <div className="kanji-modal-examples">
                <h4>Examples</h4>
                {selectedKanji.examples.map((ex, i) => (
                  <div key={i} className="kanji-modal-example">
                    {ex}
                  </div>
                ))}
              </div>
            )}

            <div className="kanji-modal-actions">
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => setSelectedKanji(null)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
