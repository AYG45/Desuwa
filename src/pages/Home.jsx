import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { Flame, Pencil, Target, MessageCircle, Play, Book, Star, Volume2, Sparkles, Rocket, BookOpen, LayoutGrid, Compass, ChevronRight } from '../components/Icons';
import { kanjiN5 } from '../data/kanji';
import { vocabulary } from '../data/vocabulary';
import { hiraganaBasic } from '../data/hiragana';
import { katakanaBasic } from '../data/katakana';
import { getLevel, calculateStreak, formatJapanese } from '../utils/helpers';
import { getDueCount } from '../utils/srs';
import { playAudio } from '../utils/tts';
import './Home.css';

export default function Home({ progress, displayMode }) {
  const { level } = getLevel(progress.xp);
  const streak = calculateStreak(progress.activeDates);
  const dueReviews = getDueCount(progress.srsItems || []);

  // Daily spotlight - use day of year as index for consistent daily pick
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const dailyKanji = kanjiN5[dayOfYear % kanjiN5.length];
  const dailyWord = vocabulary[dayOfYear % vocabulary.length];

  const accuracy =
    progress.totalAnswers > 0
      ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100)
      : 0;

  const totalLearned =
    progress.learnedHiragana.length +
    progress.learnedKatakana.length +
    progress.learnedKanji.length;

  return (
    <div className="home-page page-enter" id="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-hero-text">
            <div className="home-hero-greeting">
              {new Date().getHours() < 12
                ? 'おはようございます'
                : new Date().getHours() < 18
                ? 'こんにちは'
                : 'こんばんは'}
            </div>
            <h1 className="home-hero-title">
              Continue your <span>Japanese</span> journey
            </h1>
            <p className="home-hero-subtitle">
              {dueReviews > 0
                ? `You have ${dueReviews} SRS reviews ready today. Review them to build permanent memory!`
                : streak > 0
                ? `Amazing! You're on a ${streak}-day streak. Keep going!`
                : 'Start learning today with structured lessons and spaced repetition!'}
            </p>
            <div className="home-hero-actions">
              {dueReviews > 0 ? (
                <>
                  <Link to="/review" className="btn btn-primary btn-lg" id="hero-review-btn">
                    <Rocket size={20} /> Review Deck ({dueReviews} Due)
                  </Link>
                  <Link to="/lessons" className="btn btn-secondary btn-lg" id="hero-lessons-btn">
                    <Sparkles size={20} /> Guided Lessons
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/lessons" className="btn btn-primary btn-lg" id="hero-lessons-btn">
                    <Sparkles size={20} /> Start Guided Lessons
                  </Link>
                  <Link to="/grammar" className="btn btn-secondary btn-lg" id="hero-grammar-btn">
                    <BookOpen size={20} /> Learn Grammar
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="home-hero-visual">
            <div className="home-hero-kanji">学</div>
          </div>
        </div>
      </section>

      {/* SRS Due Banner if reviews waiting */}
      {dueReviews > 0 && (
        <section className="home-srs-banner">
          <div className="srs-banner-content">
            <div className="srs-banner-icon">
              <Rocket size={28} color="#e94560" />
            </div>
            <div className="srs-banner-text">
              <h3>Spaced Repetition Reviews Ready</h3>
              <p>You have <strong>{dueReviews} items</strong> scheduled for review. Retain what you learned!</p>
            </div>
          </div>
          <Link to="/review" className="btn btn-primary">
            Review Now
          </Link>
        </section>
      )}

      {/* Stats */}
      <section className="home-stats">
        <StatsCard
          icon={<Flame size={24} color="var(--accent-secondary)" />}
          label="Day Streak"
          value={streak}
          color="#ffa502"
        />
        <StatsCard
          icon={<Star size={24} color="var(--accent-secondary)" />}
          label="Level"
          value={`Lvl ${level}`}
          color="#e94560"
        />
        <StatsCard
          icon={<Rocket size={24} color="var(--accent-secondary)" />}
          label="SRS Items"
          value={(progress.srsItems || []).length}
          color="#3498db"
        />
        <StatsCard
          icon={<Pencil size={24} color="var(--accent-secondary)" />}
          label="Characters Learned"
          value={totalLearned}
          color="#7c5cbf"
        />
      </section>

      {/* Daily Spotlight */}
      <section className="home-spotlight">
        {/* Kanji of the Day */}
        <div className="spotlight-card">
          <div className="spotlight-card-header">
            <span><Book size={20} color="var(--text-secondary)" /></span>
            <h3>Kanji of the Day</h3>
            <span className="badge badge-primary">JLPT N5</span>
          </div>
          <div className="spotlight-kanji-display">
            <span className="spotlight-kanji-char">{dailyKanji.char}</span>
            <span className="spotlight-kanji-reading">{dailyKanji.onyomi}</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
              <span className="spotlight-kanji-meaning" style={{ margin: 0 }}>{dailyKanji.meaning}</span>
              <button className="spotlight-play-btn" style={{ margin: 0 }} onClick={() => playAudio(dailyKanji.char)} aria-label="Play pronunciation">
                <Volume2 size={16} />
              </button>
            </div>
          </div>
          <div className="spotlight-kanji-details">
            <div className="spotlight-detail">
              <div className="spotlight-detail-label">On'yomi</div>
              <div className="spotlight-detail-value">{dailyKanji.onyomi}</div>
            </div>
            <div className="spotlight-detail">
              <div className="spotlight-detail-label">Kun'yomi</div>
              <div className="spotlight-detail-value">
                {dailyKanji.kunyomi || '—'}
              </div>
            </div>
            <div className="spotlight-detail">
              <div className="spotlight-detail-label">Strokes</div>
              <div className="spotlight-detail-value">{dailyKanji.strokes}</div>
            </div>
            <div className="spotlight-detail">
              <div className="spotlight-detail-label">Meaning</div>
              <div className="spotlight-detail-value">{dailyKanji.meaning}</div>
            </div>
          </div>
        </div>

        {/* Word of the Day */}
        <div className="spotlight-card">
          <div className="spotlight-card-header">
            <span><MessageCircle size={20} color="var(--text-secondary)" /></span>
            <h3>Word of the Day</h3>
            <span className="badge badge-success">{dailyWord.category}</span>
          </div>
          <div className="spotlight-word-display">
            <span className="spotlight-word-jp">{formatJapanese(dailyWord, displayMode)}</span>
            {displayMode === 'kanji' && dailyWord.word !== dailyWord.reading && (
              <span className="spotlight-word-reading">{dailyWord.reading}</span>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
              <span className="spotlight-word-meaning" style={{ margin: 0 }}>{dailyWord.meaning}</span>
              <button className="spotlight-play-btn" style={{ margin: 0 }} onClick={() => playAudio(dailyWord.word)} aria-label="Play pronunciation">
                <Volume2 size={16} />
              </button>
            </div>
          </div>
          <div className="spotlight-word-example">
            <span className="spotlight-word-example-jp">
              {dailyWord.example.split('—')[0]}
            </span>
            <span className="spotlight-word-example-en">
              {dailyWord.example.split('—')[1] || ''}
            </span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="home-quick-actions">
        <div className="section-header">
          <h2>Learning Modules</h2>
          <p>Structured tracks to guide you from zero to JLPT N5</p>
        </div>
        <div className="quick-actions-grid">
          <Link to="/lessons" className="quick-action-card" id="qa-lessons">
            <span className="quick-action-icon"><Sparkles size={26} color="#ffa502" /></span>
            <div className="quick-action-content">
              <div className="quick-action-title">Guided Lessons</div>
              <div className="quick-action-desc">
                {(progress.completedLessons || []).length} lessons finished · Step-by-step
              </div>
            </div>
          </Link>
          <Link to="/review" className="quick-action-card" id="qa-review">
            <span className="quick-action-icon"><Rocket size={26} color="#e94560" /></span>
            <div className="quick-action-content">
              <div className="quick-action-title">SRS Review Deck</div>
              <div className="quick-action-desc">
                {dueReviews > 0 ? `${dueReviews} reviews due now!` : 'Spaced repetition queue'}
              </div>
            </div>
          </Link>
          <Link to="/grammar" className="quick-action-card" id="qa-grammar">
            <span className="quick-action-icon"><BookOpen size={26} color="#3498db" /></span>
            <div className="quick-action-content">
              <div className="quick-action-title">N5 Grammar</div>
              <div className="quick-action-desc">
                {(progress.completedGrammar || []).length}/13 mastered · Rules & examples
              </div>
            </div>
          </Link>
          <Link to="/practice" className="quick-action-card" id="qa-quiz">
            <span className="quick-action-icon"><Play size={26} color="#2ed573" /></span>
            <div className="quick-action-content">
              <div className="quick-action-title">Quiz & Practice</div>
              <div className="quick-action-desc">
                Multiple-choice & typing tests
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Study Tools & Reference (JLPT Levels, Chart, Vocabulary) */}
      <section className="home-reference-section">
        <div className="section-header">
          <h2>Study Tools & Reference</h2>
          <p>JLPT curriculum, complete kana chart, and vocabulary dictionary</p>
        </div>
        <div className="reference-cards-grid">
          <Link to="/learn" className="reference-card" id="ref-jlpt">
            <div className="reference-card-icon-wrap" style={{ background: 'rgba(233, 69, 96, 0.15)', color: '#e94560' }}>
              <Book size={24} />
            </div>
            <div className="reference-card-body">
              <div className="reference-card-top">
                <h3>JLPT Levels</h3>
                <span className="reference-badge">N5 — N1</span>
              </div>
              <p>JLPT curriculum divided from N5 to N1 with dedicated Kanji and Grammar for each level.</p>
              <div className="reference-card-meta">
                <span>N5 to N1</span>
                <span>•</span>
                <span>Kanji Hub</span>
                <span>•</span>
                <span>Grammar Hub</span>
              </div>
            </div>
            <div className="reference-card-arrow">
              <ChevronRight size={20} />
            </div>
          </Link>

          <Link to="/chart" className="reference-card" id="ref-chart">
            <div className="reference-card-icon-wrap" style={{ background: 'rgba(52, 152, 219, 0.15)', color: '#3498db' }}>
              <LayoutGrid size={24} />
            </div>
            <div className="reference-card-body">
              <div className="reference-card-top">
                <h3>Kana Chart</h3>
                <span className="reference-badge">Interactive</span>
              </div>
              <p>Complete Japanese syllabary table with standard sounds, dakuten, and combinations.</p>
              <div className="reference-card-meta">
                <span>Audio Playback</span>
                <span>•</span>
                <span>Romaji Table</span>
              </div>
            </div>
            <div className="reference-card-arrow">
              <ChevronRight size={20} />
            </div>
          </Link>

          <Link to="/vocabulary" className="reference-card" id="ref-vocabulary">
            <div className="reference-card-icon-wrap" style={{ background: 'rgba(46, 213, 115, 0.15)', color: '#2ed573' }}>
              <Compass size={24} />
            </div>
            <div className="reference-card-body">
              <div className="reference-card-top">
                <h3>Vocabulary</h3>
                <span className="reference-badge">{(progress.bookmarkedVocab || []).length} saved</span>
              </div>
              <p>JLPT N5 word bank with English search, context examples, and bookmarks.</p>
              <div className="reference-card-meta">
                <span>Core N5 Words</span>
                <span>•</span>
                <span>Search & Audio</span>
              </div>
            </div>
            <div className="reference-card-arrow">
              <ChevronRight size={20} />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
