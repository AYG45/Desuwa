import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getDueItems, reviewItem, getSRSLevelName, getSRSLevelColor, getSRSStats, formatInterval, SRS_MAX_LEVEL } from '../utils/srs';
import { playAudio } from '../utils/tts';
import { Volume2, RefreshCw, CheckCircle, Target, Flame, Star, Rocket, Award } from '../components/Icons';
import './Review.css';

export default function Review({ progress, onReviewItem }) {
  const [sessionState, setSessionState] = useState('idle'); // 'idle' | 'active' | 'results'
  const [sessionItems, setSessionItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionResults, setSessionResults] = useState({ correct: 0, again: 0, easy: 0, total: 0 });

  const dueItems = useMemo(() => getDueItems(progress.srsItems || []), [progress.srsItems]);
  const srsStats = useMemo(() => getSRSStats(progress.srsItems || []), [progress.srsItems]);

  const startSession = useCallback(() => {
    if (dueItems.length === 0) return;
    // Take up to 20 items per session
    const batch = dueItems.slice(0, 20);
    setSessionItems(batch);
    setCurrentIndex(0);
    setRevealed(false);
    setSessionResults({ correct: 0, again: 0, easy: 0, total: 0 });
    setSessionState('active');
  }, [dueItems]);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleRate = (quality) => {
    const item = sessionItems[currentIndex];
    const updated = reviewItem(item, quality);
    onReviewItem(updated);

    setSessionResults(prev => ({
      ...prev,
      total: prev.total + 1,
      correct: quality !== 'again' ? prev.correct + 1 : prev.correct,
      again: quality === 'again' ? prev.again + 1 : prev.again,
      easy: quality === 'easy' ? prev.easy + 1 : prev.easy,
    }));

    if (currentIndex + 1 >= sessionItems.length) {
      setTimeout(() => setSessionState('results'), 300);
    } else {
      setCurrentIndex(prev => prev + 1);
      setRevealed(false);
    }
  };

  const currentItem = sessionItems[currentIndex];

  // Get display info for the current item
  const getItemDisplay = (item) => {
    if (!item) return { front: '', back: '', sub: '' };
    if (item.type === 'hiragana' || item.type === 'katakana') {
      return {
        front: item.char,
        back: item.reading || item.meaning,
        sub: item.type === 'hiragana' ? 'Hiragana' : 'Katakana',
        tag: item.type,
      };
    }
    if (item.type === 'kanji') {
      return {
        front: item.char,
        back: item.meaning,
        sub: item.reading || '',
        tag: 'Kanji N5',
      };
    }
    return { front: item.char, back: item.meaning || '', sub: item.reading || '', tag: item.type };
  };

  return (
    <div className="review-page page-enter" id="review-page">
      <div className="review-header">
        <h1>Review</h1>
        <p>Strengthen your memory with spaced repetition</p>
      </div>

      {/* Idle State — Show SRS overview + start button */}
      {sessionState === 'idle' && (
        <>
          {/* SRS Level Breakdown */}
          <div className="srs-overview">
            <div className="srs-overview-card srs-due-card">
              <div className="srs-due-count">{srsStats.due}</div>
              <div className="srs-due-label">Reviews Due</div>
              {srsStats.due > 0 ? (
                <button className="btn btn-primary btn-lg srs-start-btn" onClick={startSession}>
                  <Rocket size={20} /> Start Review
                </button>
              ) : (
                <p className="srs-empty-msg">
                  {srsStats.total === 0
                    ? 'No items in your review queue yet. Complete some lessons to get started!'
                    : 'All caught up! Come back later for more reviews.'}
                </p>
              )}
            </div>

            <div className="srs-level-breakdown">
              <h3>SRS Level Breakdown</h3>
              <div className="srs-level-bars">
                {['New', 'Apprentice 1', 'Apprentice 2', 'Guru 1', 'Guru 2', 'Master', 'Enlightened', 'Burned'].map((name, i) => (
                  <div key={i} className="srs-level-row">
                    <span className="srs-level-name" style={{ color: getSRSLevelColor(i) }}>{name}</span>
                    <div className="srs-level-bar-track">
                      <div
                        className="srs-level-bar-fill"
                        style={{
                          width: srsStats.total > 0 ? `${(srsStats.levels[i] / srsStats.total) * 100}%` : '0%',
                          background: getSRSLevelColor(i),
                        }}
                      />
                    </div>
                    <span className="srs-level-count">{srsStats.levels[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="srs-stats-row">
            <div className="srs-stat-card">
              <Star size={20} color="#ffa502" />
              <div className="srs-stat-value">{srsStats.total}</div>
              <div className="srs-stat-label">Total Items</div>
            </div>
            <div className="srs-stat-card">
              <Flame size={20} color="#e94560" />
              <div className="srs-stat-value">{srsStats.apprentice}</div>
              <div className="srs-stat-label">Learning</div>
            </div>
            <div className="srs-stat-card">
              <Target size={20} color="#3498db" />
              <div className="srs-stat-value">{srsStats.guru + srsStats.master}</div>
              <div className="srs-stat-label">Mastered</div>
            </div>
            <div className="srs-stat-card">
              <CheckCircle size={20} color="#2ed573" />
              <div className="srs-stat-value">{srsStats.burned}</div>
              <div className="srs-stat-label">Burned</div>
            </div>
          </div>

          {srsStats.total === 0 && (
            <div className="srs-empty-cta">
              <h3>Start Your Journey!</h3>
              <p>Complete guided lessons to add items to your review queue.</p>
              <Link to="/lessons" className="btn btn-primary">Go to Lessons</Link>
            </div>
          )}
        </>
      )}

      {/* Active Review Session */}
      {sessionState === 'active' && currentItem && (() => {
        const display = getItemDisplay(currentItem);
        return (
          <div className="review-session">
            {/* Progress */}
            <div className="review-progress-bar">
              <div className="review-progress-fill" style={{ width: `${((currentIndex + 1) / sessionItems.length) * 100}%` }} />
            </div>
            <div className="review-progress-text">
              {currentIndex + 1} / {sessionItems.length}
            </div>

            {/* Flashcard */}
            <div className={`review-card ${revealed ? 'revealed' : ''}`}>
              <div className="review-card-tag" style={{ color: getSRSLevelColor(currentItem.level) }}>
                {display.tag} · {getSRSLevelName(currentItem.level)}
              </div>

              <div className="review-card-front">
                <div className="review-card-char">{display.front}</div>
              </div>

              {revealed && (
                <div className="review-card-back">
                  <div className="review-card-answer">{display.back}</div>
                  {display.sub && <div className="review-card-sub">{display.sub}</div>}
                  <button className="review-audio-btn" onClick={() => playAudio(currentItem.char)}>
                    <Volume2 size={18} /> Listen
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            {!revealed ? (
              <button className="btn btn-primary btn-lg review-reveal-btn" onClick={handleReveal}>
                Show Answer
              </button>
            ) : (
              <div className="review-rating-btns">
                <button className="review-rate-btn rate-again" onClick={() => handleRate('again')}>
                  <span className="rate-label">Again</span>
                  <span className="rate-hint">Didn't know</span>
                </button>
                <button className="review-rate-btn rate-good" onClick={() => handleRate('good')}>
                  <span className="rate-label">Good</span>
                  <span className="rate-hint">Got it right</span>
                </button>
                <button className="review-rate-btn rate-easy" onClick={() => handleRate('easy')}>
                  <span className="rate-label">Easy</span>
                  <span className="rate-hint">Too simple</span>
                </button>
              </div>
            )}
          </div>
        );
      })()}

      {/* Results */}
      {sessionState === 'results' && (
        <div className="review-results">
          <div className="review-results-icon">
            <Award size={52} color={sessionResults.correct === sessionResults.total ? '#ffd93d' : '#2ed573'} />
          </div>
          <h2>Session Complete!</h2>
          <p className="review-results-subtitle">
            You reviewed {sessionResults.total} item{sessionResults.total !== 1 ? 's' : ''}
          </p>

          <div className="review-results-stats">
            <div className="review-results-stat">
              <div className="review-results-stat-value" style={{ color: '#2ed573' }}>{sessionResults.correct}</div>
              <div className="review-results-stat-label">Correct</div>
            </div>
            <div className="review-results-stat">
              <div className="review-results-stat-value" style={{ color: '#ff6b6b' }}>{sessionResults.again}</div>
              <div className="review-results-stat-label">Again</div>
            </div>
            <div className="review-results-stat">
              <div className="review-results-stat-value" style={{ color: '#4d96ff' }}>{sessionResults.easy}</div>
              <div className="review-results-stat-label">Easy</div>
            </div>
          </div>

          <div className="review-results-actions">
            {dueItems.length - sessionResults.total > 0 && (
              <button className="btn btn-primary" onClick={startSession}>
                <RefreshCw size={18} /> Continue ({Math.max(0, dueItems.length - sessionResults.total)} remaining)
              </button>
            )}
            <button className="btn btn-secondary" onClick={() => setSessionState('idle')}>
              Back to Overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
