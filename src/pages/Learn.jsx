import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import StrokeCharacter from '../components/StrokeCharacter';
import {
  Book,
  CheckCircle,
  Volume2,
  Search,
  X,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  BookOpen,
} from '../components/Icons';
import { kanjiByLevel, kanjiLevels } from '../data/kanji';
import { grammarLessons, grammarLevels, grammarCategories } from '../data/grammar';
import { playAudio } from '../utils/tts';
import './Learn.css';

const JLPT_TIERS = ['N5', 'N4', 'N3', 'N2', 'N1'];

export default function Learn({ progress, onLearnCharacter }) {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('N5');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'kanji' | 'grammar'
  const [kanjiSearch, setKanjiSearch] = useState('');
  const [grammarCategory, setGrammarCategory] = useState('all');
  const [selectedKanjiModal, setSelectedKanjiModal] = useState(null);

  // Active level data
  const currentLevelInfo = kanjiLevels[selectedLevel] || kanjiLevels.N5;
  const currentKanjiList = useMemo(() => kanjiByLevel[selectedLevel] || [], [selectedLevel]);
  const currentGrammarList = useMemo(
    () => grammarLessons.filter((l) => l.level === selectedLevel),
    [selectedLevel]
  );

  // Filtered Kanji
  const filteredKanji = useMemo(() => {
    if (!kanjiSearch.trim()) return currentKanjiList;
    const q = kanjiSearch.toLowerCase().trim();
    return currentKanjiList.filter(
      (k) =>
        k.char.includes(q) ||
        (k.meaning && k.meaning.toLowerCase().includes(q)) ||
        (k.onyomi && k.onyomi.toLowerCase().includes(q)) ||
        (k.kunyomi && k.kunyomi.toLowerCase().includes(q))
    );
  }, [currentKanjiList, kanjiSearch]);

  // Filtered Grammar
  const filteredGrammar = useMemo(() => {
    if (grammarCategory === 'all') return currentGrammarList;
    return currentGrammarList.filter((g) => g.category === grammarCategory);
  }, [currentGrammarList, grammarCategory]);

  // Learned stats
  const learnedKanjiCount = useMemo(() => {
    const learnedSet = new Set(progress?.learnedKanji || []);
    return currentKanjiList.filter((k) => learnedSet.has(k.char)).length;
  }, [currentKanjiList, progress?.learnedKanji]);

  const completedGrammarCount = useMemo(() => {
    const completedSet = new Set(progress?.completedGrammar || []);
    return currentGrammarList.filter((g) => completedSet.has(g.id)).length;
  }, [currentGrammarList, progress?.completedGrammar]);

  const handleKanjiClick = (kanji) => {
    setSelectedKanjiModal(kanji);
    if (onLearnCharacter) {
      onLearnCharacter('kanji', kanji.char);
    }
  };

  const handleToggleLearnKanji = (kanjiChar) => {
    if (onLearnCharacter) {
      onLearnCharacter('kanji', kanjiChar);
    }
  };

  return (
    <div className="learn-page page-enter" id="learn-page">
      {/* Page Header */}
      <div className="learn-page-header">
        <div className="jlpt-header-badge">JLPT Mastery</div>
        <h1>JLPT Curriculum</h1>
        <p>
          Divided strictly from N5 to N1 with dedicated Kanji characters and Grammar patterns for each level.
        </p>
      </div>

      {/* Level Selection Tabs (N5 to N1) */}
      <div className="jlpt-level-nav" role="tablist">
        {JLPT_TIERS.map((level) => {
          const info = kanjiLevels[level];
          const isActive = selectedLevel === level;
          const kCount = (kanjiByLevel[level] || []).length;
          const gCount = grammarLessons.filter((g) => g.level === level).length;

          return (
            <button
              key={level}
              className={`jlpt-level-tab ${isActive ? 'active' : ''}`}
              onClick={() => {
                setSelectedLevel(level);
                setKanjiSearch('');
                setGrammarCategory('all');
              }}
              style={{
                '--level-color': info.color,
              }}
              role="tab"
              aria-selected={isActive}
            >
              <div className="level-tab-badge">{level}</div>
              <div className="level-tab-info">
                <span className="level-tab-name">JLPT {level}</span>
                <span className="level-tab-counts">
                  {kCount} Kanji • {gCount} Grammar
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Level Hero Overview Card */}
      <div
        className="jlpt-level-hero"
        style={{ '--level-color': currentLevelInfo.color }}
      >
        <div className="jlpt-hero-top">
          <div className="jlpt-hero-title-group">
            <span className="jlpt-hero-badge">{selectedLevel}</span>
            <div>
              <h2>{currentLevelInfo.label}</h2>
              <p>{currentLevelInfo.description}</p>
            </div>
          </div>

          {/* Quick Progress */}
          <div className="jlpt-hero-stats">
            <div className="jlpt-stat-pill">
              <span className="stat-num">{learnedKanjiCount}/{currentKanjiList.length}</span>
              <span className="stat-label">Kanji Learned</span>
            </div>
            <div className="jlpt-stat-pill">
              <span className="stat-num">{completedGrammarCount}/{currentGrammarList.length}</span>
              <span className="stat-label">Grammar Done</span>
            </div>
          </div>
        </div>

        {/* Sub-section Switcher (All / Kanji / Grammar) */}
        <div className="jlpt-view-toggle">
          <button
            className={`view-toggle-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Overview (Both)
          </button>
          <button
            className={`view-toggle-btn ${activeTab === 'kanji' ? 'active' : ''}`}
            onClick={() => setActiveTab('kanji')}
          >
            <Book size={15} />
            <span>Kanji ({currentKanjiList.length})</span>
          </button>
          <button
            className={`view-toggle-btn ${activeTab === 'grammar' ? 'active' : ''}`}
            onClick={() => setActiveTab('grammar')}
          >
            <BookOpen size={15} />
            <span>Grammar ({currentGrammarList.length})</span>
          </button>
        </div>
      </div>

      {/* =========================================
          SECTION 1: KANJI SECTION
          ========================================= */}
      {(activeTab === 'all' || activeTab === 'kanji') && (
        <section className="jlpt-section kanji-section" id="jlpt-kanji-section">
          <div className="jlpt-section-header">
            <div className="section-title-wrap">
              <span className="section-dot" style={{ background: currentLevelInfo.color }} />
              <div>
                <h3>{selectedLevel} Kanji Characters</h3>
                <span className="section-subtitle">
                  {currentKanjiList.length} essential characters for {selectedLevel}
                </span>
              </div>
            </div>

            {/* Kanji Search Bar */}
            <div className="kanji-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder={`Search ${selectedLevel} kanji by meaning, onyomi, kunyomi...`}
                value={kanjiSearch}
                onChange={(e) => setKanjiSearch(e.target.value)}
              />
              {kanjiSearch && (
                <button
                  className="search-clear-btn"
                  onClick={() => setKanjiSearch('')}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {filteredKanji.length === 0 ? (
            <div className="empty-results-box">
              <p>No kanji matched your search "{kanjiSearch}".</p>
            </div>
          ) : (
            <div className="jlpt-kanji-grid">
              {filteredKanji.map((k) => {
                const isLearned = progress?.learnedKanji?.includes(k.char);
                return (
                  <div
                    key={k.char}
                    className={`jlpt-kanji-card ${isLearned ? 'learned' : ''}`}
                    onClick={() => handleKanjiClick(k)}
                  >
                    {isLearned && (
                      <div className="kanji-learned-tag" title="Learned">
                        <CheckCircle size={14} color="#2ed573" />
                      </div>
                    )}
                    <div className="kanji-main-char">{k.char}</div>
                    <div className="kanji-card-readings">
                      {k.onyomi && <span className="kanji-onyomi">{k.onyomi}</span>}
                      {k.kunyomi && <span className="kanji-kunyomi">{k.kunyomi}</span>}
                    </div>
                    <div className="kanji-card-meaning">{k.meaning}</div>
                    <div className="kanji-card-strokes">{k.strokes} strokes</div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* =========================================
          SECTION 2: GRAMMAR SECTION
          ========================================= */}
      {(activeTab === 'all' || activeTab === 'grammar') && (
        <section className="jlpt-section grammar-section" id="jlpt-grammar-section">
          <div className="jlpt-section-header">
            <div className="section-title-wrap">
              <span className="section-dot" style={{ background: currentLevelInfo.color }} />
              <div>
                <h3>{selectedLevel} Grammar Patterns</h3>
                <span className="section-subtitle">
                  {currentGrammarList.length} key grammatical structures for {selectedLevel}
                </span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="grammar-category-filters">
              {Object.entries(grammarCategories).map(([key, cat]) => {
                const hasLessons =
                  key === 'all' || currentGrammarList.some((g) => g.category === key);
                if (!hasLessons && key !== 'all') return null;

                return (
                  <button
                    key={key}
                    className={`category-pill ${grammarCategory === key ? 'active' : ''}`}
                    onClick={() => setGrammarCategory(key)}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredGrammar.length === 0 ? (
            <div className="empty-results-box">
              <p>No grammar points found in this category.</p>
            </div>
          ) : (
            <div className="jlpt-grammar-grid">
              {filteredGrammar.map((lesson) => {
                const isCompleted = progress?.completedGrammar?.includes(lesson.id);
                const firstExample = lesson.examples?.[0];

                return (
                  <div key={lesson.id} className="jlpt-grammar-card">
                    <div className="grammar-card-top">
                      <div className="grammar-card-title-group">
                        <span className="grammar-cat-tag">
                          {lesson.category}
                        </span>
                        <h4>{lesson.title}</h4>
                      </div>
                      {isCompleted && (
                        <span className="grammar-completed-badge">
                          <CheckCircle size={14} /> Completed
                        </span>
                      )}
                    </div>

                    <p className="grammar-card-desc">{lesson.description}</p>

                    {lesson.keyPoint && (
                      <div className="grammar-formula-box">
                        <span className="formula-label">Pattern:</span>
                        <code>{lesson.keyPoint}</code>
                      </div>
                    )}

                    {firstExample && (
                      <div className="grammar-example-snippet">
                        <div className="snippet-jp-row">
                          <span className="snippet-jp">{firstExample.japanese}</span>
                          <button
                            className="snippet-audio-btn"
                            onClick={() => playAudio(firstExample.japanese)}
                            title="Listen to pronunciation"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                        <div className="snippet-en">{firstExample.english}</div>
                      </div>
                    )}

                    <div className="grammar-card-actions">
                      <Link to="/grammar" className="grammar-study-btn">
                        <span>Study Full Lesson</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* =========================================
          KANJI DETAIL MODAL
          ========================================= */}
      {selectedKanjiModal && (
        <div
          className="kanji-modal-overlay"
          onClick={() => setSelectedKanjiModal(null)}
        >
          <div
            className="kanji-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedKanjiModal(null)}
            >
              <X size={20} />
            </button>

            <div className="kanji-modal-header">
              {/* Stroke Order Display */}
              <div className="kanji-modal-char-wrap">
                <StrokeCharacter char={selectedKanjiModal.char} size={150} />
              </div>

              <div className="kanji-modal-main-info">
                <div className="kanji-modal-level-tag">{selectedLevel} Kanji</div>
                <h3 className="kanji-modal-meaning">{selectedKanjiModal.meaning}</h3>
                <div className="kanji-modal-meta">
                  <span>{selectedKanjiModal.strokes} Strokes</span>
                </div>
                <button
                  className="modal-audio-btn"
                  onClick={() => playAudio(selectedKanjiModal.char)}
                >
                  <Volume2 size={16} /> Listen Pronunciation
                </button>
              </div>
            </div>

            <div className="kanji-modal-details">
              {/* Readings */}
              <div className="modal-readings-row">
                <div className="reading-block">
                  <span className="reading-label">On'yomi (音読み):</span>
                  <span className="reading-value">
                    {selectedKanjiModal.onyomi || 'None'}
                  </span>
                </div>
                <div className="reading-block">
                  <span className="reading-label">Kun'yomi (訓読み):</span>
                  <span className="reading-value">
                    {selectedKanjiModal.kunyomi || 'None'}
                  </span>
                </div>
              </div>

              {/* Examples */}
              {selectedKanjiModal.examples && selectedKanjiModal.examples.length > 0 && (
                <div className="modal-examples-section">
                  <h4>Example Vocabulary</h4>
                  <div className="modal-examples-list">
                    {selectedKanjiModal.examples.map((ex, idx) => (
                      <div key={idx} className="modal-example-item">
                        <span className="example-text">{ex}</span>
                        <button
                          className="example-speak-btn"
                          onClick={() => {
                            const word = ex.split(' ')[0] || ex;
                            playAudio(word);
                          }}
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="kanji-modal-footer">
              <button
                className={`btn ${
                  progress?.learnedKanji?.includes(selectedKanjiModal.char)
                    ? 'btn-secondary'
                    : 'btn-primary'
                }`}
                onClick={() => handleToggleLearnKanji(selectedKanjiModal.char)}
              >
                <CheckCircle size={16} />
                <span>
                  {progress?.learnedKanji?.includes(selectedKanjiModal.char)
                    ? 'Learned'
                    : 'Mark as Learned'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
