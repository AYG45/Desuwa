import { useState } from 'react';
import { Volume2 } from '../components/Icons';
import { hiraganaBasic, hiraganaDakuten, hiraganaCombo } from '../data/hiragana';
import { katakanaBasic, katakanaDakuten, katakanaCombo } from '../data/katakana';
import { playAudio } from '../utils/tts';
import './KanaChart.css';

export default function KanaChart() {
  const [script, setScript] = useState('hiragana');
  const [type, setType] = useState('basic'); // basic, dakuten, combo

  const handlePlay = (e, char) => {
    e.stopPropagation(); // prevent parent click if needed
    playAudio(char);
  };

  const renderGrid = (data, isCombo) => {
    return (
      <div className={`kana-grid ${isCombo ? 'kana-grid-combo' : ''}`}>
        {data.map((item, index) => (
          <div key={index} className="kana-cell" onClick={(e) => handlePlay(e, item.char)}>
            <div className="kana-char">{item.char}</div>
            <div className="kana-romaji">{item.romaji}</div>
            <button className="kana-play-btn" aria-label={`Play ${item.char}`}>
              <Volume2 size={14} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const getActiveData = () => {
    if (script === 'hiragana') {
      if (type === 'basic') return hiraganaBasic;
      if (type === 'dakuten') return hiraganaDakuten;
      if (type === 'combo') return hiraganaCombo;
    } else {
      if (type === 'basic') return katakanaBasic;
      if (type === 'dakuten') return katakanaDakuten;
      if (type === 'combo') return katakanaCombo;
    }
    return [];
  };

  return (
    <div className="chart-page page-enter">
      <div className="chart-header">
        <h1>Kana Chart</h1>
        <p>Interactive reference for Hiragana and Katakana</p>
      </div>

      <div className="chart-controls">
        <div className="script-toggle">
          <button
            className={`btn ${script === 'hiragana' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setScript('hiragana')}
          >
            Hiragana
          </button>
          <button
            className={`btn ${script === 'katakana' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setScript('katakana')}
          >
            Katakana
          </button>
        </div>

        <div className="type-tabs">
          <button
            className={`type-tab ${type === 'basic' ? 'active' : ''}`}
            onClick={() => setType('basic')}
          >
            Basic (Gojūon)
          </button>
          <button
            className={`type-tab ${type === 'dakuten' ? 'active' : ''}`}
            onClick={() => setType('dakuten')}
          >
            Dakuten & Handakuten
          </button>
          <button
            className={`type-tab ${type === 'combo' ? 'active' : ''}`}
            onClick={() => setType('combo')}
          >
            Combinations (Yōon)
          </button>
        </div>
      </div>

      <div className="chart-content">
        <div className="chart-instructions">
          <Volume2 size={16} /> Click any character to hear its pronunciation
        </div>
        {renderGrid(getActiveData(), type === 'combo')}
      </div>
    </div>
  );
}
