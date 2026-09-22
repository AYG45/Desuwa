import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { Flame, Pencil, Target, MessageCircle, Play, Book, Star, Volume2 } from '../components/Icons';
import { kanjiN5 } from '../data/kanji';
import { vocabulary } from '../data/vocabulary';
import { hiraganaBasic } from '../data/hiragana';
import { katakanaBasic } from '../data/katakana';
import { getLevel, calculateStreak, formatJapanese } from '../utils/helpers';
import { playAudio } from '../utils/tts';
import './Home.css';

export default function Home({ progress, displayMode }) {
  const { level } = getLevel(progress.xp);
  const streak = calculateStreak(progress.activeDates);

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
              {streak > 0
                ? `Amazing! You're on a ${streak}-day streak. Keep going!`
                : 'Start learning today and build your streak!'}
            </p>
            <div className="home-hero-actions">
              <Link to="/learn" className="btn btn-primary btn-lg" id="hero-learn-btn">
                <Book size={20} /> Start Learning
              </Link>
              <Link to="/practice" className="btn btn-secondary btn-lg" id="hero-practice-btn">
                <Target size={20} /> Practice
              </Link>
            </div>
          </div>
          <div className="home-hero-visual">
            <div className="home-hero-kanji">学</div>
          </div>
        </div>
      </section>

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
          icon={<Pencil size={24} color="var(--accent-secondary)" />}
          label="Characters Learned"
          value={totalLearned}
          color="#7c5cbf"
        />
        <StatsCard
          icon={<Target size={24} color="var(--accent-secondary)" />}
          label="Accuracy"
          value={`${accuracy}%`}
          color="#2ed573"
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
          <h2>Quick Start</h2>
          <p>Jump into a learning activity</p>
        </div>
        <div className="quick-actions-grid">
          <Link to="/learn" className="quick-action-card" id="qa-hiragana">
            <span className="quick-action-icon">あ</span>
            <div className="quick-action-content">
              <div className="quick-action-title">Hiragana</div>
              <div className="quick-action-desc">
                {progress.learnedHiragana.length}/{hiraganaBasic.length} learned
              </div>
            </div>
          </Link>
          <Link to="/learn" className="quick-action-card" id="qa-katakana">
            <span className="quick-action-icon">ア</span>
            <div className="quick-action-content">
              <div className="quick-action-title">Katakana</div>
              <div className="quick-action-desc">
                {progress.learnedKatakana.length}/{katakanaBasic.length} learned
              </div>
            </div>
          </Link>
          <Link to="/practice" className="quick-action-card" id="qa-quiz">
            <span className="quick-action-icon"><Play size={24} /></span>
            <div className="quick-action-content">
              <div className="quick-action-title">Quick Quiz</div>
              <div className="quick-action-desc">
                Test your knowledge
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
